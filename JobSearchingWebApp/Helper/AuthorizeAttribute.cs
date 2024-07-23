using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using JobSearchingWebApp.Models;
using System;
using System.Diagnostics;
using Microsoft.AspNetCore.Shared;
using Microsoft.AspNetCore.Authorization;

namespace JobSearchingWebApp.Helper
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        public string? Roles { get; set; }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var korisnik = (Korisnik?)context.HttpContext.Items["Korisnik"];
            if (korisnik == null)
            {
                context.Result = new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
            }

            if (Roles != null && korisnik?.Uloga.Naziv != Roles?.ToString())
            {
                context.Result = new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
            }
        }
    }
}
