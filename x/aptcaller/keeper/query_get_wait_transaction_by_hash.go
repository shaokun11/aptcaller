package keeper

import (
	"context"
	"fmt"
	"net/url"

	"aptcaller/apt"
	"aptcaller/x/aptcaller/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) GetWaitTransactionByHash(goCtx context.Context, req *types.QueryGetWaitTransactionByHashRequest) (*types.QueryGetWaitTransactionByHashResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Process the query
	_ = ctx
	baseURL := fmt.Sprintf("%s/transactions/wait_by_hash/%s", apt.Url, req.TxnHash)
	urlObj, _ := url.Parse(baseURL)
	finalURL := urlObj.String()
	res, err := apt.Call(finalURL)
	ret := types.QueryGetWaitTransactionByHashResponse(*res)
	return &ret, err
}
