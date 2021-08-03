import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GoodsData } from 'src/models/goods/model';
import {
  OrderData,
  OrderListData,
  OrderListParam,
  OrderParam,
} from 'src/models/orders/model';
import { OrderService } from 'src/services/orders/order';

@Resolver()
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Query(() => OrderListData, {
    name: 'orderListData',
  })
  orderList(@Args('param') param: OrderListParam): Promise<OrderListData> {
    return this.orderService.getOrderList(param);
  }

  @Query(() => OrderData, {
    name: 'orderData',
  })
  order(@Args('param') param: OrderParam): Promise<OrderData> {
    return this.orderService.getOrder(param);
  }
}

@Resolver(() => OrderData)
export class OrderPropertyResolver {
  @ResolveField(() => GoodsData, {
    name: 'goodsData',
    nullable: true,
  })
  goodsData(@Parent() orderData: OrderData): any {
    return { __typename: 'GoodsData', goodsId: orderData.goodsId };
  }
}
