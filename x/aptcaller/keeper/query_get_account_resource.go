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

func (k Keeper) GetAccountResource(goCtx context.Context, req *types.QueryGetAccountResourceRequest) (*types.QueryGetAccountResourceResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(goCtx)
	// TODO: Process the query
	_ = ctx
	addr := req.Address
	url := fmt.Sprintf("%s/accounts/%s/resource/%s", apt.Url, addr, req.ResourceType)
	res, err := apt.Call(url)
	ret := types.QueryGetAccountResourceResponse(*res)
	return &ret, err
}
