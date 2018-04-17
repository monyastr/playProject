package controllers;

import models.MyEntity;
import play.data.Form;
import play.data.FormFactory;
import play.mvc.Controller;
import play.mvc.Result;
import views.html.Entities.*;

import javax.inject.*;
import java.util.List;

public class EntitiesController extends Controller {



    @Inject
    FormFactory formFactory;

    public Result index() {
        return redirect(routes.EntitiesController.list());
    }

    public Result list() {
        List<MyEntity> entities = MyEntity.find.all();
        return ok(views.html.Entities.entities.render(entities));
    }

    public Result create() {
        Form<MyEntity> entityForm = formFactory.form(MyEntity.class);
        return ok(create.render(entityForm));
    }

    public Result save() {
        Form<MyEntity> entityForm = formFactory.form(MyEntity.class).bindFromRequest();
        if(entityForm.hasErrors()){
            flash("danger","Fields can`t be empty");
            return badRequest(create.render(entityForm));
        }
        MyEntity myEntity = entityForm.get();
        myEntity.save();
        return redirect(routes.EntitiesController.list());
    }

    public Result edit(Integer id) {

        MyEntity myEntity = MyEntity.find.byId(id);
        if (myEntity == null) {
            return notFound("MyEntity Not Found");
        }
        Form<MyEntity> entityForm = formFactory.form(MyEntity.class).fill(myEntity);
        return ok(edit.render(entityForm ));
    }

    public Result update() {
        Form<MyEntity> entityForm = formFactory.form(MyEntity.class).bindFromRequest();
        if(entityForm.hasErrors()){
            flash("danger","Fields can`t be empty");
            return badRequest(edit.render(entityForm));
        }
        MyEntity myEntity =entityForm.get();
        MyEntity oldMyEntity = MyEntity.find.byId(myEntity.id);
        if (oldMyEntity == null) {
            return notFound("MyEntity Not Found");
        }
        oldMyEntity.name = myEntity.name;
        oldMyEntity.date = myEntity.date;
        oldMyEntity.list = myEntity.list;
        oldMyEntity.update();
        return redirect(routes.EntitiesController.list());
    }

    public Result delete(Integer id) {
        MyEntity myEntity = MyEntity.find.byId(id);
        if (myEntity == null) {
            return notFound("MyEntity Not Found");
        }
        myEntity.delete();
        return redirect(routes.EntitiesController.list());
    }


}
