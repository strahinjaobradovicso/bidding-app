import { AddSuffix } from "./mixinSuffix";
import {
    HasManyCreateAssociationMixin,
    HasManyGetAssociationsMixin,
    HasManyRemoveAssociationMixin, Model
} from "sequelize";

export type HasManyMixin<TModel extends Model, TPrimaryKey, TName extends string> = AddSuffix<
    {
        get: HasManyGetAssociationsMixin<TModel>;
        create: HasManyCreateAssociationMixin<TModel>;
        remove: HasManyRemoveAssociationMixin<TModel, TPrimaryKey>;
    },
    TName
>;