import { AddSuffix } from "./mixinSuffix";
import { 
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin,
    Model,
} from "sequelize";

export type BelongsToMixin<TModel extends Model, TPrimaryKey, TName extends string> = AddSuffix<
    {
        get: BelongsToGetAssociationMixin<TModel>;
        set: BelongsToSetAssociationMixin<TModel, TPrimaryKey>;
    },
    TName
>;