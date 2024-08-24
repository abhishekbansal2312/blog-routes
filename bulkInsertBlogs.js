const mongoose = require("mongoose");
const BlogPost = require("./models/blogpost"); // Adjust the path if necessary

// Define the array of dummy blog posts
const blogs = [
  { title: "Blog 1", content: "Content for blog 1", author: "Author 1" },
  { title: "Blog 2", content: "Content for blog 2", author: "Author 2" },
  { title: "Blog 3", content: "Content for blog 3", author: "Author 3" },
  { title: "Blog 4", content: "Content for blog 4", author: "Author 4" },
  { title: "Blog 5", content: "Content for blog 5", author: "Author 5" },
  { title: "Blog 6", content: "Content for blog 6", author: "Author 6" },
  { title: "Blog 7", content: "Content for blog 7", author: "Author 7" },
  { title: "Blog 8", content: "Content for blog 8", author: "Author 8" },
  { title: "Blog 9", content: "Content for blog 9", author: "Author 9" },
  { title: "Blog 10", content: "Content for blog 10", author: "Author 10" },
];

async function bulkInsertBlogs() {
  try {
    await mongoose.connect(
      "mongodb+srv://admin1:admin1@cluster0.eab39.mongodb.net/MyBlogDatabase?retryWrites=true&w=majority"
    );
    await BlogPost.insertMany(blogs);
    console.log("Blogs inserted successfully");
  } catch (error) {
    console.error("Error inserting blogs:", error);
  } finally {
    mongoose.connection.close();
  }
}

bulkInsertBlogs();
