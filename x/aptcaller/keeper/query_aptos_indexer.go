package keeper

import (
	"context"

	"aptcaller/apt"
	"aptcaller/x/aptcaller/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) AptosIndexer(goCtx context.Context, req *types.QueryAptosIndexerRequest) (*types.QueryAptosIndexerResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Process the query
	_ = ctx
	res, err := apt.PostRaw(apt.IndexerUrl, req.Body)
	ret := types.QueryAptosIndexerResponse(*res)
	return &ret, err
}
