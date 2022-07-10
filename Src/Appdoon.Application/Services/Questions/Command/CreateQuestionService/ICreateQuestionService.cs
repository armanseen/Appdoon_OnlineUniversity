using Appdoon.Application.Interfaces;
using Appdoon.Common.Dtos;
using Appdoon.Domain.Entities.Homeworks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Appdoon.Application.Services.Questions.Command.CreateQuestionService
{
    public class CreateQuestionDto
    {
        public string QuestionDescription { get; set; } = string.Empty;
        public string Option1 { get; set; } = string.Empty;
        public string Option2 { get; set; } = string.Empty;
        public string Option3 { get; set; } = string.Empty;
        public string Option4 { get; set; } = string.Empty;
        public int Answer { get; set; } = 0;
        public int HomeworkId { get; set; }
    }
    

    public interface ICreateQuestionService
    {
        ResultDto Execute(CreateQuestionDto createQuestionDto);
    }

    public class CreateQuestionService : ICreateQuestionService
    {
        private readonly IDatabaseContext _context;

        public CreateQuestionService(IDatabaseContext context)
        {
            _context = context;
        }

        public ResultDto Execute(CreateQuestionDto questionDto)
        {
            try
            {
                // validate homework

                Question question = new Question()
                {
                    QuestionDescription = questionDto.QuestionDescription,
                    Option1 = questionDto.Option1,
                    Option2 = questionDto.Option2,
                    Option3 = questionDto.Option3,
                    Option4 = questionDto.Option4,
                    Answer = questionDto.Answer,
                    HomeworkId = questionDto.HomeworkId,
                };


                var homework = _context.Homeworks.First(homework => homework.Id == questionDto.HomeworkId);

                // trash?????
                homework.Questions ??= new List<Question>();



                homework.Questions.Add(question);
                _context.SaveChanges();

                return new ResultDto()
                {
                    IsSuccess = true,
                    Message = "سوال اضافه شد !",
                };
            }
            catch (Exception e)
            {
                return new ResultDto()
                {
                    IsSuccess = false,
                    Message = e.Message,
                };
            }
        }
    }
}
