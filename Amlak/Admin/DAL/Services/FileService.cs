using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Security.Cryptography;
using System.Threading.Tasks;
using System.Net;
using System.Drawing;
using System.Drawing.Imaging;
using System.Linq;
using System.Reflection;

namespace DAL.Services
{
    public static class FileService
    {
        public static string GenerateRandomNameForFile(IFormFile file)
        {
            try
            {
                var timeNow = DateTime.Now.ToString();
                timeNow = timeNow.Replace('.', '-');
                timeNow = timeNow.Replace(' ', '_');
                timeNow = timeNow.Replace(':', '-');
                timeNow = timeNow.Replace('/', '-');
                timeNow = timeNow.Trim();
                var rnd = new Random();
                var createName = rnd.Next(1999, 999999).ToString() + timeNow;
                var format = file.FileName.Split('.');
                createName = createName + "." + format[format.Length - 1];
                return createName;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public static async Task<string> UploadFileStream(IFormFile file, string path, string api)
        {
            try
            {
                if (file != null && file.Length > 0)
                {
                    string newName = GenerateRandomNameForFile(file);
                    string filePath = Path.Combine(Directory.GetCurrentDirectory(), path, newName);
                    FileStream fileStream = new FileStream(filePath, FileMode.Create);

                    await file.CopyToAsync(fileStream);

                    path = path.Replace("wwwroot/", "");
                    filePath = Path.Combine(path, newName);
                    filePath = api + "/" + filePath;
                    return filePath.Replace(@"\", @"/");
                }

                return null;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public static string GetFileUrl(IFormFile file, string path, string api)
        {
            try
            {
                if (file != null && file.Length > 0)
                {
                    string fileName = GenerateRandomNameForFile(file);
                    fileName = Path.Combine(path, fileName);
                    fileName = api + "/" + fileName;
                    return fileName.Replace(@"\", @"/");
                }
                return null;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public static bool CheckIsFileExistInRootFolder(string fullPath)
        {
            try
            {
                FileStream fs = new FileStream(fullPath, FileMode.Open);

                if (fs != null)
                {
                    fs.Close();
                    fs.Dispose();
                    return true;
                }
            }
            catch (Exception)
            {
                return false;
            }

            return false;
        }

        public static async Task RemoveTempFolderWithFiles(string path)
        {
            try
            {
                string resultPath = Path.Combine(Directory.GetCurrentDirectory(), path);

                if (Directory.Exists(resultPath))
                {
                    Directory.Delete(resultPath, true);
                }

                await Task.CompletedTask;
            }
            catch (Exception e)
            {
                return;
            }
        }



        public static FtpStatusCode CreateDirectoryOnFTPServer(string folderPath, string folderName, string host, string username, string password)
        {
            string path = @"/" + folderPath + folderName;

            try
            {
                WebRequest request = WebRequest.Create(host + path);
                request.Method = WebRequestMethods.Ftp.MakeDirectory;
                request.Credentials = new NetworkCredential(username, password);

                using (var resp = (FtpWebResponse)request.GetResponse())
                {
                    return resp.StatusCode;
                }
            }
            catch (Exception e)
            {
                return FtpStatusCode.BadCommandSequence;
            }
        }

        public static bool IsDirectoryExistOnFTPServer(string path, string host, string username, string password)
        {
            bool isExist = false;
            path = host + @"/" + path;

            try
            {
                FtpWebRequest request = (FtpWebRequest)WebRequest.Create(path);
                request.Credentials = new NetworkCredential(username, password);
                request.Method = WebRequestMethods.Ftp.ListDirectory;
                using (FtpWebResponse response = (FtpWebResponse)request.GetResponse())
                {
                    isExist = true;
                }
            }
            catch (WebException e)
            {
                if (e.Response != null)
                {
                    FtpWebResponse response = (FtpWebResponse)e.Response;
                    if (response.StatusCode == FtpStatusCode.ActionNotTakenFileUnavailable)
                    {
                        return false;
                    }
                }
            }

            return isExist;
        }

        public static string UploadFileOnFTPServer(string path, string host, string username, string password, string userId, IFormFile file)
        {
            try
            {
                string toPath = host + @"/" + path;
                string fileName = GenerateRandomNameForFile(file, userId);

                FtpWebRequest request = (FtpWebRequest)WebRequest.Create(toPath + fileName);
                request.Credentials = new NetworkCredential(username, password);
                request.Method = WebRequestMethods.Ftp.UploadFile;

                using (Stream ftpStream = request.GetRequestStream())
                {
                    file.CopyTo(ftpStream);
                    return toPath + fileName;
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public static async Task<string> GetFilesFromFTPServer(string ftpPath, string toPath, string api, string username, string password, string userId)
        {
            if (CheckIsFileExistOnFTPServer(ftpPath, username, password))
            {
                string[] pathSlices = ftpPath.Split('/');
                string fileName = pathSlices[pathSlices.Length - 1];
                string rootPath = @"wwwroot" + toPath;
                CreateDirectoryForUser(rootPath, userId);

                string filePath = Path.Combine(Directory.GetCurrentDirectory(), rootPath, userId, fileName);
                string resultPath = api + toPath + "/" + userId + "/" + fileName;

                if (!CheckIsFileExistInRootFolder(filePath))
                {
                    FtpWebRequest displayRequest = (FtpWebRequest)WebRequest.Create(ftpPath);
                    displayRequest.Method = WebRequestMethods.Ftp.DownloadFile;
                    displayRequest.Credentials = new NetworkCredential(username, password);
                    FtpWebResponse displayResponse = (FtpWebResponse)displayRequest.GetResponse();
                    Stream responseStream = displayResponse.GetResponseStream();

                    FileStream fs = new FileStream(filePath, FileMode.Create);
                    await responseStream.CopyToAsync(fs);
                    fs.Dispose();
                    responseStream.Dispose();
                }

                return resultPath;
            }

            return null;
        }

        public static bool CheckIsFileExistOnFTPServer(string ftpPath, string username, string password)
        {
            FtpWebRequest request = (FtpWebRequest)WebRequest.Create(ftpPath);
            request.Credentials = new NetworkCredential(username, password);
            request.Method = WebRequestMethods.Ftp.GetFileSize;

            try
            {
                FtpWebResponse response = (FtpWebResponse)request.GetResponse();
                return true;
            }
            catch (WebException ex)
            {
                FtpWebResponse response = (FtpWebResponse)ex.Response;
                if (response.StatusCode == FtpStatusCode.ActionNotTakenFileUnavailable)
                    return false;
            }
            return false;
        }

        public static async Task<string> ConvertFilesFromFTPToBase64(string userName, string password, string ftpPath)
        {
            WebClient client = new WebClient();
            client.Credentials = new NetworkCredential(userName, password);
            byte[] file = await client.DownloadDataTaskAsync(ftpPath);
            return "data:image/jpg;base64, " + Convert.ToBase64String(file);
        }


        public static string GenerateRandomNameForFile(IFormFile file, string userId)
        {
            try
            {
                if (file != null && file.Length > 0)
                {
                    MD5 md5 = MD5.Create();
                    string oldName = userId + file.FileName;
                    byte[] inputBytes = Encoding.ASCII.GetBytes(oldName);
                    byte[] hashBytes = md5.ComputeHash(inputBytes);
                    StringBuilder sb = new StringBuilder();
                    for (int i = 0; i < hashBytes.Length; i++)
                    {
                        sb.Append(hashBytes[i].ToString("X2"));
                    }
                    string fileName = Path.GetFileName(file.FileName);
                    string fileExtension = Path.GetExtension(fileName);
                    return String.Concat(sb, fileExtension);
                }
                else
                {
                    return null;
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public static void CreateDirectoryForUser(string path, string directoryName)
        {
            try
            {
                string directoryPath = path + "/" + directoryName;

                if (!Directory.Exists(directoryPath))
                {
                    DirectoryInfo df = Directory.CreateDirectory(directoryPath);
                }
            }
            catch (Exception e)
            {
                return;            }
        }



        public static async Task<string> ConvertTemplatesToString(dynamic variables, string templatePath)
        {
            try
            {
                string resultTexts = string.Empty;

                using (StreamReader sr = new StreamReader(templatePath))
                {
                    resultTexts = await sr.ReadToEndAsync();
                }

                if (variables != null && variables.Length > 0)
                {
                    for (int i = 0; i < variables.Length; i++)
                    {
                        resultTexts = resultTexts.Replace(variables[i].varKey, variables[i].varValue);
                    }
                }

                return resultTexts;
            }
            catch (Exception e)
            {
                return null;
            }
        }



        public static T Cast<T>(this Object myobj)
        {
            Type objectType = myobj.GetType();
            Type target = typeof(T);
            var x = Activator.CreateInstance(target, false);
            var z = from source in objectType.GetMembers().ToList()
                    where source.MemberType == MemberTypes.Property
                    select source;
            var d = from source in target.GetMembers().ToList()
                    where source.MemberType == MemberTypes.Property
                    select source;
            List<MemberInfo> members = d.Where(memberInfo => d.Select(c => c.Name)
               .ToList().Contains(memberInfo.Name)).ToList();
            PropertyInfo propertyInfo;
            object value;
            foreach (var memberInfo in members)
            {
                propertyInfo = typeof(T).GetProperty(memberInfo.Name);
                value = myobj.GetType().GetProperty(memberInfo.Name).GetValue(myobj, null);

                propertyInfo.SetValue(x, value, null);
            }
            return (T)x;
        }
    
    
    
        public static string GetMonthName(int month)
        {
            switch (month)
            {
                case 1:
                    return "Jan";
                case 2:
                    return "Feb";
                case 3:
                    return "Mar";
                case 4:
                    return "Apr";
                case 5:
                    return "May";
                case 6:
                    return "Jun";
                case 7:
                    return "Jul";
                case 8:
                    return "Aug";
                case 9:
                    return "Sep";
                case 10:
                    return "Oct";
                case 11:
                    return "Nov";
                case 12:
                    return "Dec";
                default:
                    return "";
            }
        }
    }
}
