﻿using Appdoon.Application.Services.Users.Command.LoginUserService;
using Appdoon.Application.Services.Users.Command.RegisterUserService;
using Appdoon.Common.Dtos;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;

namespace Appdoon.WebApi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AuthenticationController : ControllerBase
	{
		private readonly IRegisterUserService _registerUserService;
		private readonly ILoginUserService _loginUserService;

		public AuthenticationController(IRegisterUserService registerUserService, ILoginUserService loginUserService)
		{
			_registerUserService = registerUserService;
			_loginUserService = loginUserService;
		}

		//[HttpPost]
		//public JsonResult Register(RequestRegisterUserDto user)
		//{
		//	// use new regiser user service
		//	var result = _registerUserService.Execute(user);

		//	if(result.IsSuccess == true)
		//	{
		//		var claims = new List<Claim>()
		//		{
		//			// we don`t set Id in cookies for now
		//			//new Claim(ClaimTypes.NameIdentifier,result.Data.Id.ToString()),
		//			new Claim(ClaimTypes.Email,user.Email),
		//			new Claim(ClaimTypes.Name, user.FirstName+" "+user.LastName),
		//			//new Claim(ClaimTypes.Role,UserRoles.Costumer.ToString()),
		//		};

		//		var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
		//		var principal = new ClaimsPrincipal(identity);
		//		var properties = new AuthenticationProperties()
		//		{
		//			IsPersistent = true,
		//		};

		//		HttpContext.SignInAsync(principal, properties);
		//	}

		//	return new JsonResult(result);
		//}

		//[HttpPost]
		//public JsonResult Login(User user)
		//{
		//	var result = _loginUserService.Execute(user);

		//	if(result.IsSuccess == true)
		//	{
		//		var claims = new List<Claim>()
		//		{
		//			// we don`t set Id in cookies for now
		//			//new Claim(ClaimTypes.NameIdentifier,result.Data.Id.ToString()),
		//			new Claim(ClaimTypes.Email,user.Email),
		//			new Claim(ClaimTypes.Name, user.FirstName+" "+user.LastName),
		//			//new Claim(ClaimTypes.Role,UserRoles.Costumer.ToString()),
		//		};

		//		var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
		//		var principal = new ClaimsPrincipal(identity);

		//		// Remember me check box
		//		bool Remember = true;
		//		var properties = new AuthenticationProperties()
		//		{
		//			IsPersistent = Remember,
		//		};

		//		HttpContext.SignInAsync(principal, properties);
		//	}
		//	return new JsonResult(result);
		//}

		[HttpGet]
		public JsonResult UserSignOut()
		{
			HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

			return new JsonResult(new ResultDto()
			{
				IsSuccess = true,
				Message = "خروج موفق!",
			});
		}
	}
}