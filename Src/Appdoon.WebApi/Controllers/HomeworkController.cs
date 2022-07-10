using Appdoon.Application.Services.Homeworks.Command.CreateHomeworkService;
using Appdoon.Application.Services.Homeworks.Command.DeleteHomeworkService;
using Appdoon.Application.Services.Homeworks.Command.UpdateHomeworkService;
using Appdoon.Application.Services.Homeworks.Query.GetAllHomeworksService;
using Appdoon.Application.Services.Homeworks.Query.GetHomeworkService;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Appdoon.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class HomeworkController : ControllerBase
    {
        //Get
        private readonly IGetHomeworkService _getHomeworkService;
        //Create
        private readonly ICreateHomeworkService _createHomeworkService;
        //Update
        private readonly IUpdateHomeworkService _updateHomeworkService;
        //Delete
        private readonly IDeleteHomeworkService _deleteHomeworkService;
        //Get All
        private readonly IGetAllHomeworksService _getAllHomeworksService;

        private readonly IWebHostEnvironment _env;

        public HomeworkController(IGetHomeworkService getHomeworkService,
                                  ICreateHomeworkService createHomeworkService,
                                  IUpdateHomeworkService updateHomeworkService,
                                  IDeleteHomeworkService deleteHomeworkService,
                                  IGetAllHomeworksService getAllHomeworksService,
                                  IWebHostEnvironment env)
        {
            _getHomeworkService = getHomeworkService;
            _createHomeworkService = createHomeworkService;
            _updateHomeworkService = updateHomeworkService;
            _deleteHomeworkService = deleteHomeworkService;
            _getAllHomeworksService = getAllHomeworksService;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get(int PageNumber, int PageSize)
        {
            var result = _getAllHomeworksService.Execute(PageNumber, PageSize);
            return new JsonResult(result);
        }

        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            var result = _getHomeworkService.Execute(id);

            return new JsonResult(result);
        }

        [HttpPost]
        public JsonResult Post(CreateHomeworkDto homeworkDto)
        {
            var result = _createHomeworkService.Execute(homeworkDto);
            return new JsonResult(result);
        }

        [HttpPut("{id}")]
        public JsonResult Put(int id, UpdateHomeworkDto updateHomeworkDto)
        {
            var result = _updateHomeworkService.Execute(id, updateHomeworkDto);
            return new JsonResult(result);
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            var result = _deleteHomeworkService.Execute(id);
            return new JsonResult(result);
        }
    }
}
