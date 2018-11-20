using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace test.Models
{
    public class UserDB
    {
        //declare connection string  
        string cs = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;

        //string cs = "Data Source=192.168.121.7,1401; Initial Catalog=TestDB; UID=sa; pwd=123456; Integrated Security=False;";
        //SqlConnection cs = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["constr"].ConnectionString);


        //Return list of all user  
        public List<User> ListAll()
        {
            List<User> lst = new List<User>();
            using (SqlConnection con = new SqlConnection(cs))
            {

                if (con.State == ConnectionState.Open)
                {
                    con.Close();
                }
                con.Open();
                SqlCommand com = new SqlCommand(" Select * from tblUser ", con);
                com.CommandType = CommandType.Text;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new User
                    {
                        ID = Convert.ToInt32(rdr["Id"]),
                        Name = rdr["Name"].ToString(),
                        Email = rdr["Email"].ToString(),
                        City = rdr["City"].ToString(),
                        MobileNo = rdr["MobileNo"].ToString(),
                        Education = rdr["Education"].ToString(),

                        Photo = rdr["Photo"].ToString(),

                        Hobby = rdr["Hobby"].ToString(),

                    });
                }
                return lst;
            }
        }

        //Method for Adding an User  
        public int Add(User usr)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("InsUpdUser", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id", usr.ID);
                com.Parameters.AddWithValue("@Name", usr.Name);
                com.Parameters.AddWithValue("@Email", usr.Email);
                com.Parameters.AddWithValue("@City", usr.City);
                com.Parameters.AddWithValue("@MobileNo", usr.MobileNo);
                com.Parameters.AddWithValue("@Education", usr.Education);
                com.Parameters.AddWithValue("@photo", usr.Photo);
                com.Parameters.AddWithValue("@Hobby", usr.Hobby);
                com.Parameters.AddWithValue("@Action", "Insert");
                i = com.ExecuteNonQuery();
            }
            return i;
        }

        //Method for Updating User record  
        public int Update(User usr)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("InsUpdUser", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id", usr.ID);
                com.Parameters.AddWithValue("@Name", usr.Name);
                com.Parameters.AddWithValue("@Email", usr.Email);
                com.Parameters.AddWithValue("@City", usr.City);
                com.Parameters.AddWithValue("@MobileNo", usr.MobileNo);
                com.Parameters.AddWithValue("@Education", usr.Education);
                com.Parameters.AddWithValue("@photo", usr.Photo);
                com.Parameters.AddWithValue("@Hobby", usr.Hobby);
                com.Parameters.AddWithValue("@Action", "Update");
                i = com.ExecuteNonQuery();
            }
            return i;
        }

        //Method for Deleting an Employee  
        public int Delete(int ID)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("DeleteUser", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id", ID);
                i = com.ExecuteNonQuery();
            }
            return i;
        }

    }
}