const paginate = require("jw-paginate");
const express = require("express");
const connection = require("../../config/db.config");

const getItems = (req, res) => {
  connection.query("SELECT * FROM category", (err, result) => {
    if (err) throw err;

    const items = result;
    // get page from query params or default to first page
    const page = parseInt(req.query.page) || 1;

    // get pager object for specified page
    const pageSize = 13;
    const pager = paginate(items.length, page, pageSize);

    // get page of items from items array
    const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    // return pager object and current page of items
    return res.json({ pager, pageOfItems });
  });
};

const getAllItems = (req, res) => {
  connection.query("SELECT * FROM category", (err, result) => {
    if (err) throw err;
    console.log(result);
    return res.json({result});
  });
};

module.exports = { getItems, getAllItems };
