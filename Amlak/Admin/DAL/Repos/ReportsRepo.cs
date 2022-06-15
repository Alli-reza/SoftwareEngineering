using AutoMapper;
using DAL.Infrastructure;
using DAL.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repos
{
    public interface IReportsRepo
    {
        Task<IEnumerable<Last10Customer>> GetLast10CustomersReport();
        Task<EntityCounters> EntityCounters();
    }

    public class ReportsRepo : IReportsRepo
    {
        private readonly AmlakDbContext _context;
        private readonly IHttpContextAccessor _httpContext;
        private readonly IConfiguration _configur;
        private readonly DataProvider dataProvider;
        private readonly IMapper _mapper;

        public ReportsRepo(
            IHttpContextAccessor httpContext,
            IConfiguration configur,
            AmlakDbContext context,
            IMapper mapper)
        {
            this._context = context;
            this._httpContext = httpContext;
            this._configur = configur;
            this.dataProvider = new();
            this._configur.Bind("Amlak", dataProvider);
            this._mapper = mapper;
        }

        public async Task<IEnumerable<Last10Customer>> GetLast10CustomersReport()
        {
            try
            {
                using (IDbConnection db = new SqlConnection(this._context
                    .Database.GetConnectionString()))
                {
                    string query = @"exec Last10CustomersReport";
                    IEnumerable<Last10Customer> result = await db
                        .QueryAsync<Last10Customer>(query);
                    db.Close();

                    return result;
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public async Task<EntityCounters> EntityCounters()
        {
            try
            {
                using (IDbConnection db = new SqlConnection(this._context
                    .Database.GetConnectionString()))
                {
                    string query = @"exec EntityCounters";
                    EntityCounters result = await db
                        .QuerySingleOrDefaultAsync<EntityCounters>(query);
                    db.Close();

                    return result;
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }
    }
}
