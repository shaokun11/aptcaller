package keeper

import (
	"context"

	"aptcaller/x/aptcaller/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) GetTransactionByCount(goCtx context.Context, req *types.QueryGetTransactionByCountRequest) (*types.QueryGetTransactionByCountResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Process the query
	_ = ctx
	res := k.GetTx(ctx, req.Count)
	return &types.QueryGetTransactionByCountResponse{
		AptRes: &types.AptRes{
			Header: "",
			Body:   res.AptTx,
			Code:   200,
		},
	}, nil
}
