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

func (k Keeper) GetTransactionByVersion(goCtx context.Context, req *types.QueryGetTransactionByVersionRequest) (*types.QueryGetTransactionByVersionResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Process the query
	_ = ctx
	baseURL := fmt.Sprintf("%s/transactions/by_version/%s", apt.Url, req.TxnVersion)
	urlObj, _ := url.Parse(baseURL)
	finalURL := urlObj.String()
	res, err := apt.Call(finalURL, req.Header)
	ret := types.QueryGetTransactionByVersionResponse(*res)
	return &ret, err
}
