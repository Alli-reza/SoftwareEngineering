using AutoMapper;
using DAL.Models;
using DAL.ViewModel;

namespace DAL.Services
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AdminProfileVM, AdminProfile>();
            CreateMap<AdminProfile, AdminProfileVM>();

            CreateMap<Contract, ContractVM>();
            CreateMap<ContractVM, Contract>();

            CreateMap<Customer, CustomerVM>();
            CreateMap<CustomerVM, Customer>();

            CreateMap<Estate, EstateVM>();
            CreateMap<EstateVM, Estate>();

            CreateMap<EstateAsset, EstateAssetVM>();
            CreateMap<EstateAssetVM, EstateAsset>();

            CreateMap<MyEstate, MyEstateVM>();
            CreateMap<MyEstateVM, MyEstate>();
        }
    }
}
