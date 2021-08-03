import { Directive, Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: '商品信息' })
@Directive('@extends')
@Directive('@key(fields: "goodsId")')
export class GoodsData {
  @Field(() => String, { nullable: false, description: '商品 ID' })
  @Directive('@external')
  goodsId: string;
}
