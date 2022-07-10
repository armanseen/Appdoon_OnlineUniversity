using Appdoon.Application.Interfaces;
using Appdoon.Common.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Appdoon.Application.Services.Questions.Command.DeleteQuestionService
{
	public interface IDeleteQuestionService
	{
		ResultDto Execute(int id);
	}

	public class DeleteQuestionService : IDeleteQuestionService
	{
		private readonly IDatabaseContext _context;

		public DeleteQuestionService(IDatabaseContext context)
		{
			_context = context;
		}
		public ResultDto Execute(int id)
		{
			try
			{

				var question = _context.Questions.Where(s => s.Id == id).FirstOrDefault();

				if (question == null)
				{
					return new ResultDto()
					{
						IsSuccess = false,
						Message = "این آیدی وجود ندارد!",
					};
				}

				question.IsRemoved = true;
				question.RemoveTime = DateTime.Now;
				_context.SaveChanges();

				return new ResultDto()
				{
					IsSuccess = true,
					Message = "سوال حدف شد.",
				};
			}
			catch (Exception e)
			{
				return new ResultDto()
				{
					IsSuccess = false,
					Message = "خطا در حذف سوال!",
				};
			}
		}
	}
}
