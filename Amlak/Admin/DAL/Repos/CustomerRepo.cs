using AutoMapper;
using DAL.Infrastructure;
using DAL.Models;
using DAL.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repos
{
    public interface ICustomerRepo
    {
        Task<IEnumerable<CustomerViewList>> GetAllCustomersForListView();
        Task<CustomerCollection> GetAllCutomers(CustomerCollection pageCollection);
        Task<CustomerVM> GetCustomerById(int id);
        Task<int> AddCustomer(CustomerVM customer);
        Task<int> UpdateCustomer(CustomerVM customer);
        Task<bool> DeleteCustomer(int id);
    }

    public class CustomerRepo : ICustomerRepo
    {
        private readonly AmlakDbContext _context;
        private readonly IHttpContextAccessor _httpContext;
        private readonly IConfiguration _configur;
        private readonly DataProvider dataProvider;
        private readonly IMapper _mapper;

        public CustomerRepo(
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

        public async Task<IEnumerable<CustomerViewList>> GetAllCustomersForListView()
        {
            try
            {
                IEnumerable<CustomerViewList> customers = await this._context.Customer
                    .Where(w => !w.Deleted && w.Activate)
                    .Select(s => new CustomerViewList() 
                    {
                        Id = s.Id,
                        FullName = s.FullName,
                        PhoneNumber = s.PhoneNumber
                    })
                    .OrderBy(o => o.FullName)
                    .ToListAsync();

                return customers;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public async Task<CustomerCollection> GetAllCutomers(CustomerCollection pageCollection)
        {
            try
            {
                IEnumerable<Customer> items;

                if (string.IsNullOrEmpty(pageCollection.SearchWord))
                {
                    items = await this._context.Customer
                        .Where(w => !w.Deleted)
                        .OrderByDescending(o => o.CreatedDate)
                        .Skip(pageCollection.Skip)
                        .Take(pageCollection.Take)
                        .ToListAsync();
                }
                else
                {
                    items = await this._context.Customer
                        .Where(w => !w.Deleted && w.PhoneNumber == pageCollection.SearchWord)
                        .OrderByDescending(o => o.CreatedDate)
                        .Skip(pageCollection.Skip)
                        .Take(pageCollection.Take)
                        .ToListAsync();
                }

                if (items != null && items.Any())
                {
                    pageCollection.Customers = this._mapper
                        .Map<IEnumerable<CustomerVM>>(items);

                    if (pageCollection.Counts < 1)
                    {
                        pageCollection.Counts = await this._context.Customer
                            .Where(w => !w.Deleted)
                            .CountAsync();
                    }

                    pageCollection.SearchWord = string.Empty;
                }

                return pageCollection;
            }
            catch (Exception e)
            {
                return null;
            }
        }
    
        public async Task<CustomerVM> GetCustomerById(int id)
        {
            try
            {
                Customer customer = await this._context.Customer
                    .Where(w => !w.Deleted && w.Id == id)
                    .SingleOrDefaultAsync();

                return this._mapper.Map<CustomerVM>(customer);
            }
            catch (Exception e)
            {
                return null;
            }
        }
    
        public async Task<int> AddCustomer(CustomerVM customer)
        {
            try
            {
                Customer newCustomer = new()
                {
                    Activate = customer.Activate,
                    Address = customer.Address,
                    ContractType = customer.ContractType,
                    CreatedDate = DateTime.Now,
                    CustomerType = customer.CustomerType,
                    Deleted = false,
                    FullName = customer.FullName,
                    LatestUpdate = null,
                    MyEstateId = customer.MyEstateId,
                    PhoneNumber = customer.PhoneNumber,
                };

                await this._context.Customer.AddAsync(newCustomer);
                await this._context.SaveChangesAsync();

                return newCustomer.Id;
            }
            catch (Exception e)
            {
                return -1;
            }
        }
    
        public async Task<int> UpdateCustomer(CustomerVM customer)
        {
            try
            {
                Customer oldCustomer = await this._context.Customer
                    .Where(w => !w.Deleted && w.Id == customer.Id)
                    .SingleOrDefaultAsync();

                if (oldCustomer != null)
                {
                    oldCustomer.Activate = customer.Activate;
                    oldCustomer.Address = customer.Address;
                    oldCustomer.ContractType = customer.ContractType;
                    oldCustomer.CustomerType = customer.CustomerType;
                    oldCustomer.FullName = customer.FullName;
                    oldCustomer.LatestUpdate = DateTime.Now;
                    oldCustomer.PhoneNumber = customer.PhoneNumber;

                    this._context.Customer.Update(oldCustomer);
                    return await this._context.SaveChangesAsync();
                }

                return 0;
            }
            catch (Exception e)
            {
                return -1;
            }
        }
    
        public async Task<bool> DeleteCustomer(int id)
        {
            try
            {
                Customer customer = await this._context.Customer
                    .Where(w => !w.Deleted && w.Id == id)
                    .SingleOrDefaultAsync();

                if (customer != null)
                {
                    customer.Deleted = true;

                    this._context.Customer.Update(customer);
                    await this._context.SaveChangesAsync();

                    return true;
                }

                return false;
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}
