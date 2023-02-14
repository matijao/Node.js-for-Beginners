const express = require("express");
const Category = require("../../models/Category");
const router = express.Router();
//const User = require("../../models/Category");


router.all("/*", (req, res, next) => {   // all after "/admin"

    req.app.locals.layout = "admin";  // overwrite, če pride kdo do "/admin/*"
    next();


}); 


router.get("/", (req, res) => {  // "/admin" je že od prej, zato tukaj ni potreben

    Category.find({}).then(categories => {
        res.render("admin/categories/index", {categories: categories});

    })

});

router.post("/create", (req, res) => {  // "/admin" je že od prej, zato tukaj ni potreben

    const newCategory = new Category({
        name: req.body.name,
    });

    newCategory.save().then(savedCategory => {

        res.redirect("/admin/categories");

    });

});

router.get("/edit/:id", (req, res) => {  // "/admin" je že od prej, zato tukaj ni potreben

    Category.findOne({_id: req.params.id}).then(category => {
        res.render("admin/categories/edit", {category: category});

    })

});

router.put("/edit/:id", (req, res) => {  // to je URL "/admin" je že od prej, zato tukaj ni potreben

    Category.findOne({_id: req.params.id}).then(category => {

        category.name = req.body.name;

        category.save().then(savedCategory => {
            res.redirect("/admin/categories");  //to je pot do mape 
        });
        

    });

});

router.delete("/:id", (req, res) => {
    Category.findOne({_id: req.params.id})
        .then(category => {

            category.remove();

            req.flash("warning_message", "Category was successfully deleted");

            res.redirect("/admin/categories");


    });
})



module.exports = router;