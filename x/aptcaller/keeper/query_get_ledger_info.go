package keeper

import (
	"context"

	"aptcaller/apt"
	"aptcaller/x/aptcaller/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) GetLedgerInfo(goCtx context.Context, req *types.QueryGetLedgerInfoRequest) (*types.QueryGetLedgerInfoResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Process the query
	_ = ctx
	res, err := apt.Call(apt.Url)
	ret := types.QueryGetLedgerInfoResponse(*res)
	return &ret, err
}
