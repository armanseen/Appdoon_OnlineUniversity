using Appdoon.Application.Interfaces;
using Appdoon.Common.Dtos;
using Appdoon.Domain.Entities.Homeworks;
using Appdoon.Domain.Entities.HomeWorks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Appdoon.Application.Services.Homeworks.Command.CreateHomeworkService
{
    public class CreateHomeworkDto
    {
        public string Title { get; set; }
        public int MinScore { get; set; }
    }
    public interface ICreateHomeworkService
    {
        ResultDto Execute(CreateHomeworkDto homeworkDto);
    }
    public class CreateHomeworkService : ICreateHomeworkService
    {
        private readonly IDatabaseContext _context;

        public CreateHomeworkService(IDatabaseContext context)
        {
            _context = context;
        }
        public ResultDto Execute(CreateHomeworkDto createHomeworkDto)
        {
            try
            {

                var homework = new Homework()
                {
                    MinScore = createHomeworkDto.MinScore,
                    Title = createHomeworkDto.Title,
                };

                _context.Homeworks.Add(homework);
                _context.SaveChanges();

                return new ResultDto()
                {
                    IsSuccess = true,
                    Message = "تمرین اضافه شد.",
                };
            }
            catch (Exception e)
            {
                return new ResultDto()
                {
                    IsSuccess = false,
                    Message = "خطا در اضافه شدن تمرین!",
                };
            }
        }
    }
}
