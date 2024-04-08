package keeper

import (
	"context"
	"fmt"

	"aptcaller/apt"
	"aptcaller/x/aptcaller/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) SubmitTransaction(goCtx context.Context, req *types.QuerySubmitTransactionRequest) (*types.QuerySubmitTransactionResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(goCtx)
	// TODO: Process the query
	_ = ctx
	baseURL := fmt.Sprintf("%s/transactions ", apt.Url)
	res, err := apt.Post(baseURL, req.Body)
	ret := types.QuerySubmitTransactionResponse(*res)
	return &ret, err
}
