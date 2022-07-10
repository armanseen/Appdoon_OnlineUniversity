using Appdoon.Application.Interfaces;
using Appdoon.Common.Dtos;
using Appdoon.Common.Pagination;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Appdoon.Application.Services.Homeworks.Query.GetAllHomeworksService
{
    public class HomeworkDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int MinScore { get; set; }
    }
    public class AllHomeworksDto
    {
        public List<HomeworkDto> Homeworks { get; set; }
        public int RowCount { get; set; }
    }
    public interface IGetAllHomeworksService
    {
        public ResultDto<AllHomeworksDto> Execute(int page_number, int page_size);
    }

    public class GetAllHomeworksService : IGetAllHomeworksService
    {
        private readonly IDatabaseContext _context;

        public GetAllHomeworksService(IDatabaseContext databaseContext)
        {
            _context = databaseContext;
        }

        public ResultDto<AllHomeworksDto> Execute(int page_number, int page_size)
        {
            try
            {
                int rowCount = 0;
                var homeworks = _context.Homeworks.Select(s => new HomeworkDto
                {
                    Id = s.Id,
                    Title = s.Title,
                    MinScore = s.MinScore,
                }).ToPaged(page_number, page_size, out rowCount)
                .ToList();
                AllHomeworksDto allHomeworksDto = new AllHomeworksDto();
                allHomeworksDto.Homeworks = homeworks;
                allHomeworksDto.RowCount = rowCount;

                return new ResultDto<AllHomeworksDto>()
                {
                    IsSuccess = true,
                    Message = "دسته‌بندی‌ها ارسال شدند.",
                    Data = allHomeworksDto
                };

            }
            catch (Exception e)
            {
                return new ResultDto<AllHomeworksDto>()
                {
                    IsSuccess = false,
                    Message = "ارسال ناموفق دسته‌بندی‌ها!",
                    Data = new AllHomeworksDto()
                };
            }
        }
    }
}
