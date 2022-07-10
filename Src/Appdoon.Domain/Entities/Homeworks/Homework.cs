using Appdoon.Domain.Commons;
using Appdoon.Domain.Entities.Homeworks;
using Appdoon.Domain.Entities.Progress;
using Appdoon.Domain.Entities.RoadMaps;
using Appdoon.Domain.Entities.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Appdoon.Domain.Entities.HomeWorks
{
    public class Homework : BaseEntity 
    {
        public string Title { get; set; } = string.Empty;
        public List<Question> Questions { get; set; } = new();
        public int MinScore { get; set; }
        public List<HomeworkProgress> HomeworkProgresses { get; set; } = new();
        public List<ChildStep> ChildSteps { get; set; } = new();
        public User? Creator { get; set; }
        public int? CreatorId { get; set; }

        //  public int ChildStepId { get; set; }
    }
}
