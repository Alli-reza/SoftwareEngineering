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
using System.Threading.Tasks;

namespace DAL.Repos
{
    public interface IContractRepo
    {
        Task<ContractCollection> GetAllContracts(ContractCollection pageCollection);
        Task<ContractVM> GetContractById(int id);
        Task<int> AddContract(ContractVM contract);
        Task<bool> DeleteContract(int id);
    }

    public class ContractRepo : IContractRepo
    {
        private readonly AmlakDbContext _context;
        private readonly IHttpContextAccessor _httpContext;
        private readonly IConfiguration _configur;
        private readonly DataProvider dataProvider;
        private readonly IMapper _mapper;

        public ContractRepo(
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

        public async Task<ContractCollection> GetAllContracts(ContractCollection pageCollection)
        {
            try
            {
                IEnumerable<Contract> items;

                items = await this._context.Contract
                    .Where(w => !w.Deleted)
                    .Include(i => i.Customer)
                    .OrderByDescending(o => o.CreatedDate)
                    .Skip(pageCollection.Skip)
                    .Take(pageCollection.Take)
                    .ToListAsync();

                if (items != null && items.Any())
                {
                    pageCollection.Contracts = this._mapper
                        .Map<IEnumerable<ContractVM>>(items);

                    if (pageCollection.Counts < 1)
                    {
                        pageCollection.Counts = await this._context.Contract
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
    
        public async Task<ContractVM> GetContractById(int id)
        {
            try
            {
                Contract contract = await this._context.Contract
                    .Where(w => !w.Deleted && w.Id == id)
                    .SingleOrDefaultAsync();

                return this._mapper.Map<ContractVM>(contract);
            }
            catch (Exception e)
            {
                return null;
            }
        }
    
        public async Task<int> AddContract(ContractVM contract)
        {
            try
            {
                Contract newContract = new()
                {
                    Activate = contract.Activate,
                    AmountBeforePay = contract.AmountBeforePay,
                    CreatedDate = DateTime.Now,
                    CustomerId = contract.CustomerId,
                    Deleted = false,
                    DocumentType = contract.DocumentType,
                    EstateId = contract.EstateId,
                    ExpirationTime = DateTime.Parse(contract.ExpirationTime),
                    LatestUpdate = null,
                    LoanAmount = contract.LoanAmount,
                    MortgageAmount = contract.MortgageAmount,
                    MyEstateId = contract.MyEstateId,
                    NumberOfPeople = contract.NumberOfPeople,
                    SellingPrice = contract.SellingPrice
                };

                await this._context.Contract.AddAsync(newContract);
                await this._context.SaveChangesAsync();

                return newContract.Id;
            }
            catch (Exception e)
            {
                return -1;
            }
        }
    
        public async Task<bool> DeleteContract(int id)
        {
            try
            {
                Contract contract = await this._context.Contract
                    .Where(w => !w.Deleted && w.Id == id)
                    .SingleOrDefaultAsync();

                if (contract != null)
                {
                    contract.Deleted = true;

                    this._context.Contract.Update(contract);
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
