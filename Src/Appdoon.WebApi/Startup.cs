using Appdoon.Application.Interfaces;
using Appdoon.Application.Services.Categories.Command.CreateCategoryService;
using Appdoon.Application.Validatores.UserValidatore;
using Appdoon.Presistence.Contexts;
using FluentValidation;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using Microsoft.Extensions.FileProviders;
using Appdoon.Application.Services.Steps.Command.CreateStepService;
using Appdoon.Application.Services.Steps.Query.GetAllStepService;
using Appdoon.Application.Services.Lessons.Command.CreateLessonService;
using Appdoon.Application.Services.Lessons.Query.GetAllLessonsService;
using Appdoon.Application.Services.ChildSteps.Command.CreateChildStepService;
using Appdoon.Application.Services.Categories.Query.GetIndividualCategoryService;
using Appdoon.Application.Services.Categories.Command.DeleteCategoryService;
using Appdoon.Application.Services.Categories.Command.UpdateCategoryService;


using Appdoon.Application.Services.Users.Command.RegisterUserService;
using Appdoon.Application.Services.Users.Query.GetBookMarkRoadMapService;
using Appdoon.Application.Services.Users.Query.GetRegisteredRoadMapService;
using Appdoon.Application.Services.Users.Query.GetUserService;

using Appdoon.Application.Services.Users.Command.LoginUserService;
using Appdoon.Application.Services.Users.Command.EditUserService;
using Appdoon.Application.Services.Lessons.Command.DeleteLessonService;
using Appdoon.Application.Services.Lessons.Command.UpdateLessonService;
using Appdoon.Application.Services.ChildSteps.Query.GetIndividualChildStepService;
using Appdoon.Application.Services.ChildSteps.Command.DeleteChildStepService;
using Appdoon.Application.Services.ChildSteps.Command.UpdateChildStepService;
using Appdoon.Application.Services.Linkers.Command.DeleteLinkerService;
using Appdoon.Application.Services.Linkers.Command.UpdateLinkerService;
using Appdoon.Application.Services.Linkers.Query.GetAllLinkersService;
using Appdoon.Application.Services.Linkers.Query.GetIndividualLinkerService;
using Appdoon.Application.Services.Steps.Query.GetIndividualStepService;
using Appdoon.Application.Services.Steps.Command.DeleteStepService;
using Appdoon.Application.Services.Steps.Command.UpdateStepService;
using Appdoon.Application.Services.Categories.Query.GetAllCategoriesService;
using Appdoon.Application.Services.Roadmaps.Command.CreateRoadmapService;
using Appdoon.Application.Services.Roadmaps.Command.DeleteRoadmapService;
using Appdoon.Application.Services.Roadmaps.Command.UpdateRoadmapService;
using Appdoon.Application.Services.Roadmaps.Query.GetAllRoadmapsService;
using Appdoon.Application.Services.Roadmaps.Query.GetIndividualRoadmapService;
using Appdoon.Application.Services.ChildSteps.Query.GetAllChildStepsService;
using Appdoon.Application.Services.Linkers.Command.CreateLinkerService;
using Appdoon.Application.Services.Lessons.Query.GetIndividualLessonService;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using Appdoon.Common.UserRoles;
using Appdoon.Application.Services.RoadMaps.Query.FilterRoadmapsService;
using Appdoon.Application.Services.RoadMaps.Query.SearchRoadmapsService;
using Appdoon.Application.Services.Lessons.Query.SearchLessonsService;
using Appdoon.Application.Services.Categories.Query.SearchCategoriesService;

namespace OU_API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //Enable CORS
            // i add allow credentials
            services.AddCors(c =>
            {
                c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            });


            //JSON Serializer
            services.AddControllersWithViews().
                AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore)
                .AddNewtonsoftJson(options =>
                options.SerializerSettings.ContractResolver = new Newtonsoft.Json.Serialization.DefaultContractResolver());


            // Authentication
            services.AddAuthentication(options =>
            {
                options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            }).AddCookie(options =>
            {
                // Set correct path
                options.LoginPath = new PathString("/Login/Login");
                options.ExpireTimeSpan = TimeSpan.FromMinutes(5.0);
                options.Cookie.Name = "Appdoon_Auth";
            });

            // Just Admins can use this side
            services.AddAuthorization(options =>
            {
                options.AddPolicy("Admin", policy => policy.RequireClaim(ClaimTypes.Role, UserRole.Admin.ToString()));
                options.AddPolicy("User", policy => policy.RequireClaim(ClaimTypes.Role, UserRole.User.ToString(), UserRole.Teacher.ToString(), UserRole.Admin.ToString()));
                options.AddPolicy("Teacher", policy => policy.RequireClaim(ClaimTypes.Role, UserRole.Teacher.ToString(),UserRole.Admin.ToString()));
            });



            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "OU_API", Version = "v1" });
            });

            // Inject Register User service
            services.AddScoped<IRegisterUserService, RegisterUserService>();

            // Inject Login User service
            services.AddScoped<ILoginUserService, LoginUserService>();

            // Dependency Injection for Database Context
            services.AddScoped<IDatabaseContext, DatabaseContext>();

            


            // 
            services.AddScoped<IGetUserService, GetUserService>();

            //Dependency Injecton Edit user info in profile page
            services.AddScoped<IEditUserService,EditUserService>();

            //
            services.AddScoped<IGetRegisteredRoadMapService, GetRegisteredRoadMapService>();

            //
            services.AddScoped<IGetBookMarkRoadMapService, GetBookMarkRoadMapService>();









            //Dependency Injecton For Category
            services.AddScoped<IGetIndividualCategoryService,GetIndividualCategoryService>();
            services.AddScoped<IGetAllCategoriesService, GetCategoriesService>();
            services.AddScoped<ICreateCategoryService, CreateCategoryService>();
            services.AddScoped<IDeleteCategoryService,DeleteCategoryService>();
            services.AddScoped<IUpdateCategoryService, UpdateCategoryService>();
            services.AddScoped<ISearchCategoriesService, SearchCategoriesService>();


            //Dependency Injecton For Lesson
            services.AddScoped<IGetIndividualLessonService, GetLessonService>();
            services.AddScoped<IGetAllLessonsService, GetAllLessonsService>();
            services.AddScoped<ICreateLessonService, CreateLessonService>();
            services.AddScoped<IDeleteLessonService, DeleteLessonService>();
            services.AddScoped<IUpdateLessonService, UpdateLessonService>();
            services.AddScoped<ISearchLessonsService, SearchLessonsService>();

            //Dependency Injecton For ChildStep
            services.AddScoped<IGetIndividualChildStepService, GetIndividualChildStepService>();
            services.AddScoped<IGetAllChildStepsService, GetChildStepsService>();
            services.AddScoped<ICreateChildStepService, CreateChildStepService>();
            services.AddScoped<IDeleteChildStepService, DeleteChildStepService>();
            services.AddScoped<IUpdateChildStepService, UpdateChildStepService>();

            //Dependency Injecton For Linker
            services.AddScoped<IGetIndividualLinkerService, GetIndividualLinkerService>();
            services.AddScoped<IGetAllLinkersService, GetAllLinkersService>();
            services.AddScoped<ICreateLinkerService, AddLinkerService>();
            services.AddScoped<IDeleteLinkerService, DeleteLinkerService>();
            services.AddScoped<IUpdateLinkerService, UpdateLinkerService>();


            //Dependency Injecton For Roadmap
            services.AddScoped<IGetIndividualRoadmapService, GetIndividualRoadMapService>();
            services.AddScoped<IGetAllRoadmapsService, GetAllRoadMapService>();
            services.AddScoped<ICreateRoadmapService, CreateRoadMapIndividualService>();
            services.AddScoped<IDeleteRoadmapService, DeleteRoadmapService>();
            services.AddScoped<IUpdateRoadmapService, UpdateRoadmapService>();
            services.AddScoped<IFilterRoadmapsService, FilterRoadmapsService>();
            services.AddScoped<ISearchRoadmapsService, SearchRoadmapsService>();

            //Dependency Injecton For Step
            services.AddScoped<IGetIndividualStepService, GetIndividualStepService>();
            services.AddScoped<IGetAllStepsService, GetAllStepService>();
            services.AddScoped<ICreateStepService, CreateStepService>();
            services.AddScoped<IDeleteStepService, DeleteStepService>();
            services.AddScoped<IUpdateStepService, UpdateStepService>();












            // Injection for user validatore
            // Be aware of UserValidatore class in Asp.Net
            services.AddScoped<IValidator<RequestRegisterUserDto>, UserValidatore>();

            // Add EF Core
            services.AddEntityFrameworkSqlServer()
                .AddDbContext<DatabaseContext>(option => option.UseSqlServer(Configuration["ConnectionStrings:OUAppCon"]));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "OU_API v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(),
                "Photos")),
                RequestPath = "/Photos"
            });
        }
    }
}
