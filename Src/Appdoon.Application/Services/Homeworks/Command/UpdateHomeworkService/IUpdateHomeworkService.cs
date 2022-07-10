using Appdoon.Application.Interfaces;
using Appdoon.Common.Dtos;
using Appdoon.Domain.Entities.Homeworks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Appdoon.Application.Services.Homeworks.Command.UpdateHomeworkService
{
    public class UpdateHomeworkDto
    {
        public int MinScore { get; set; }
        public string Title { get; set; }
    }
    public interface IUpdateHomeworkService
    {
        ResultDto Execute(int id, UpdateHomeworkDto updateHomeworkDto);
    }
    public class UpdateHomeworkService : IUpdateHomeworkService
    {
        private readonly IDatabaseContext _context;

        public UpdateHomeworkService(IDatabaseContext context)
        {
            _context = context;
        }
        public ResultDto Execute(int id, UpdateHomeworkDto updateHomeworkDto)
        {
            try
            {
                var homework = _context.Homeworks
                    .Where(h => h.Id == id)
                    .Include(h => h.Questions)
                    .FirstOrDefault();

                homework.UpdateTime = DateTime.Now;
                homework.MinScore = updateHomeworkDto.MinScore;
                homework.Title = updateHomeworkDto.Title;

                _context.SaveChanges();

                return new ResultDto()
                {
                    IsSuccess = true,
                    Message = "تمرین بروزرسانی شد.",
                };
            }
            catch (Exception e)
            {
                return new ResultDto()
                {
                    IsSuccess = false,
                    Message = "خطا در بروزرسانی تمرین!",
                };
            }
        }
    }
}
