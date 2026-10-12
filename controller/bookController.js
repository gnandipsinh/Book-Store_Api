import BookStore from "../model/bookData.js";
import httpError from "../middleware/httpError.js";
import fs from "fs";

const add = async (req, res, next) => {
  try {
    const { title, author, ISBN, description, price } = req.body;

    // Multer upload.single("bookImg") stores file in req.file
    const bookImg = req.file ? [req.file.path] : [];

    if (
      !title ||
      !author ||
      !ISBN ||
      !description ||
      !price ||
      bookImg.length === 0
    ) {
      return next(
        new httpError(
          "Title, author, ISBN, description, price and book image are required",
          400,
        ),
      );
    }

    const book = await BookStore.create({
      title,
      author,
      ISBN,
      description,
      price,
      bookImg,
    });

    return res.status(201).json({
      success: true,
      message: "Book added successfully",
      book,
    });
  } catch (error) {
    if (error.code === 11000) {
      return next(new httpError("ISBN already exists", 409));
    }

    return next(new httpError(error.message, 500));
  }
};

const getAll = async (req, res, next) => {
  try {
    const books = await BookStore.find({});

    return res.status(200).json({
      success: true,
      message: "Book Store data retrieved successfully",
      total: books.length,
      book: books,
    });
  } catch (error) {
    return next(new httpError(error.message, 500));
  }
};

const BookFindById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await BookStore.findById(id);

    if (!book) {
      return next(new httpError("Book not found", 404));
    }

    return res.status(200).json({
      success: true,
      message: "Book details retrieved successfully",
      book,
    });
  } catch (error) {
    return next(new httpError(error.message, 500));
  }
};

const BookDelete = async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await BookStore.findByIdAndDelete(id);

    if (!book) {
      return next(new httpError("Book not found", 404));
    }

    // Delete uploaded image files if they exist
    for (const file of book.bookImg || []) {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
      }
    }

    return res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    return next(new httpError(error.message, 500));
  }
};

const bookUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await BookStore.findById(id);

    if (!book) {
      return next(new httpError("Book not found", 404));
    }

    const allowedFields = ["title", "author", "ISBN", "description", "price"];

    const updates = Object.keys(req.body);

    // Validate that every requested field is allowed
    const isValidUpdates = updates.every((field) =>
      allowedFields.includes(field),
    );

    if (!isValidUpdates) {
      return next(new httpError("Only allowed fields can be updated", 400));
    }

    // Replace book image if a new image was uploaded
    if (req.file) {
      for (const file of book.bookImg || []) {
        if (fs.existsSync(file)) {
          fs.unlinkSync(file);
        }
      }

      book.bookImg = [req.file.path];
    }

    // Update the requested text fields
    updates.forEach((field) => {
      book[field] = req.body[field];
    });

    await book.save();

    return res.status(200).json({
      success: true,
      message: "Book updated successfully",
      book,
    });
  } catch (error) {
    if (error.code === 11000) {
      return next(new httpError("ISBN already exists", 409));
    }

    return next(new httpError(error.message, 500));
  }
};

export default {
  add,
  getAll,
  BookFindById,
  BookDelete,
  bookUpdate,
};
