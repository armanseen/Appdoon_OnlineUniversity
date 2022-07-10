using Appdoon.Application.Services.Questions.Command.CreateQuestionService;
using Appdoon.Application.Services.Questions.Command.DeleteQuestionService;
using Appdoon.Application.Services.Questions.Command.UpdateQuestionService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Appdoon.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        //Get All
        //Get Individual
        //Create
        private readonly ICreateQuestionService _createQuestionService;
        //Delete
        private readonly IDeleteQuestionService _deleteQuestionService;
        //Update
        private readonly IUpdateQuestionService _updateQuestionService;


        public QuestionController(ICreateQuestionService createQuestionService,
                                  IDeleteQuestionService deleteQuestionService,
                                  IUpdateQuestionService updateQuestionService)
        {

            _createQuestionService = createQuestionService;
            _deleteQuestionService = deleteQuestionService;
            _updateQuestionService = updateQuestionService;
        }

        /*
        // GET: api/<StepController>
        [HttpGet]
        public JsonResult Get()
        {
            var result = _getAllStepsService.Execute();
            return new JsonResult(result);
        }

        // GET api/<StepController>/5
        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            var result = _getIndividualStepService.Execute(id);
            return new JsonResult(result);
        }
        */

        // POST api/<StepController>
        [HttpPost]
        public JsonResult Post(CreateQuestionDto createQuestionDto)
        {
            var result = _createQuestionService.Execute(createQuestionDto);
            return new JsonResult(result);
        }

        // PUT api/<StepController>/5
        [HttpPut("{id}")]
        public JsonResult Put(int id, UpdateQuestionDto updateQuestionDto)
        {
            var result = _updateQuestionService.Execute(id, updateQuestionDto);
            return new JsonResult(result);
        }

        // DELETE api/<StepController>/5
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            var result = _deleteQuestionService.Execute(id);
            return new JsonResult(result);
        }
    }
}
