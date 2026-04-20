using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Http;
using Employee_Management_System.Responses;

namespace Employee_Management_System.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }
        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception)
            {
                httpContext.Response.ContentType = "application/json";
                httpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                var response = new ApiResponse<string>(

                    false,
                      "An unexpected error occurred.Please try again later..",
                      null // You can choose to include the exception message or not
                 );



                var json = JsonSerializer.Serialize(response);
                await httpContext.Response.WriteAsync(json);
            }
        }
    }
}
