const fs = require("fs");                     // file system for logging
const URL = require("../model/url");          // URL mongoose model
const { nanoid } = require("nanoid");         // unique ID generator

const makeurl = async (req, res) => {
  const allurl = await URL.find({});
  const url = req.body.url;                   // original URL from request
  const shorturl = nanoid(8);                 // generate short ID

  await URL.create({                          // save to database
    shortID: shorturl,
    redirectURL: url,
    visits: [],
  });
  const link =`http://localhost:8000/url/${shorturl}`

  res.render("home",{
    id:shorturl,
    urls:allurl
  })
};

const geturl = async (req, res) => {
  const shortID = req.params.shorturl;        // short ID from params
  //never make 2 db calls in one fn for speed

  const entry = await URL.findOneAndUpdate(   // find & update visit time
    { shortID: shortID },
    { $push: { visits: { time: Date.now() } } },
    { new: true }
  );

  if (!entry) {                               // if short URL not found
    return res.status(404).json({ error: "Short URL not found" });
  }

  const log = `${entry.redirectURL} time : ${Date.now()}\n`; // log entry

  fs.appendFile("./log.txt", log, (err) => {  // append log to file
    if (err) console.log(err);
  });

  res.redirect(entry.redirectURL);            // redirect to original URL
};

const analystics = async (req, res) => {
  const shortID = req.params.shorturl;
  //find from db
  const entry = await URL.findOne({ shortID });
  //get visits
  const visit = entry.visits.length;
  res.json({ site: entry.redirectURL, visits: visit });
};

const homepage = async(req, res) => {
  const allurl= await URL.find({})
  res.render("home",{
    urls:allurl
  }
  );
};


module.exports = { makeurl, geturl ,analystics,homepage};         // export controllers
