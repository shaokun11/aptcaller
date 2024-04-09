package keeper

import (
	"context"
	"encoding/hex"

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

	bs, err := hex.DecodeString(req.Body)
	if err != nil {
		panic(err)
	}
	res, err := apt.PostRaw(apt.IndexerUrl, string(bs))
	ret := types.QueryAptosIndexerResponse(*res)
	return &ret, err
}
