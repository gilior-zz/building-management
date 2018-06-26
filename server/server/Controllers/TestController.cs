using System.Collections.Generic;
using System.Web.Http;

namespace server.Controllers
{
    public class TestController : ApiController
    {
        [HttpGet]
        public IHttpActionResult ApartmentsDetailed()
        {

            return Ok(new List<int>() { 1, 2, 3 });
        }
    }
}
