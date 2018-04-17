package models;
import io.ebean.Finder;
import io.ebean.Model;
import play.data.validation.Constraints;

import javax.persistence.Id;


@javax.persistence.Entity
public class MyEntity extends Model {
    @Id
    public Integer id;
    @Constraints.Required
    public String name;
    public String list;
    @Constraints.Required
    public String date;

    public static Finder<Integer, MyEntity> find = new Finder<>(MyEntity.class);




}
