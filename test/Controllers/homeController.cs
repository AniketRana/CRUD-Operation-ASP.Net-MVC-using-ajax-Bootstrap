using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using test.Models;

namespace test.Controllers
{
    public class homeController : Controller
    {
        UserDB db = new UserDB();
        // GET: home
        public ActionResult Index()
        {
            //return RedirectToAction("List");
            return View();
        }
        public JsonResult List()
        {
            return Json(db.ListAll(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(User usr)
        {
            return Json(db.Add(usr), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int ID)
        {
            var Employee = db.ListAll().Find(x => x.ID.Equals(ID));
            return Json(Employee, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(User usr)
        {
            return Json(db.Update(usr), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            return Json(db.Delete(ID), JsonRequestBehavior.AllowGet);
        }
    }
}