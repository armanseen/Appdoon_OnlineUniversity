using Appdoon.Application.Interfaces;
using Appdoon.Common.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Appdoon.Application.Services.Questions.Command.UpdateQuestionService
{
	public class UpdateQuestionDto
	{
		public string QuestionDescription { get; set; } = string.Empty;
		public string Option1 { get; set; } = string.Empty;
		public string Option2 { get; set; } = string.Empty;
		public string Option3 { get; set; } = string.Empty;
		public string Option4 { get; set; } = string.Empty;
		public int Answer { get; set; } = 0;

	}
	public interface IUpdateQuestionService
	{
		ResultDto Execute(int id, UpdateQuestionDto updateQuestionDto);
	}

	public class UpdateQuestionService : IUpdateQuestionService
	{
		private readonly IDatabaseContext _context;

		public UpdateQuestionService(IDatabaseContext context)
		{
			_context = context;
		}
		public ResultDto Execute(int id, UpdateQuestionDto question_front)
		{
			try
			{

				/*
				// check validation rules
				UpdateCategoryValidatore validationRules = new UpdateCategoryValidatore();
				var result = validationRules.Validate(category);
				if (result.IsValid == false)
				{
					return new ResultDto()
					{
						IsSuccess = false,
						Message = result.Errors[0].ErrorMessage,
					};
				}
				*/


				var question_back = _context.Questions.Where(s => s.Id == id).FirstOrDefault();
				if (question_back == null)
				{
					return new ResultDto()
					{
						IsSuccess = false,
						Message = "این آیدی وجود ندارد!",
					};
				}

				question_back.QuestionDescription = question_front.QuestionDescription;
				question_back.Option1 = question_front.Option1;
				question_back.Option2 = question_front.Option2;
				question_back.Option3 = question_front.Option3;
				question_back.Option4 = question_front.Option4;
				question_back.Answer = question_front.Answer;
				question_back.UpdateTime = DateTime.Now;
				_context.SaveChanges();

				return new ResultDto()
				{
					IsSuccess = true,
					Message = "سوال بروزرسانی شد.",
				};
			}
			catch (Exception e)
			{
				return new ResultDto()
				{
					IsSuccess = false,
					Message = "خطا در بروزرسانی سوال!",
				};
			}
		}
	}
}
