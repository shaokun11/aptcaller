package keeper

import (
	"context"
	"fmt"
	"net/url"
	"strings"

	"aptcaller/apt"
	"aptcaller/x/aptcaller/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) GetAccountResources(goCtx context.Context, req *types.QueryGetAccountResourcesRequest) (*types.QueryGetAccountResourcesResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Process the query
	_ = ctx

	addr := strings.ToLower(req.Address)
	baseURL := fmt.Sprintf("%s/accounts/%s/resources", apt.Url, addr)
	urlObj, _ := url.Parse(baseURL)
	params := url.Values{}
	if apt.IsValidQueryStringNum(req.Limit) {
		params.Add("limit", req.Limit)
	}
	if apt.IsValidQueryCursor(req.Start) {
		params.Add("start", req.Start)
	}
	if apt.IsValidQueryStringNum(req.LedgerVersion) {
		params.Add("ledger_version", req.Limit)
	}
	urlObj.RawQuery = params.Encode()
	finalURL := urlObj.String()
	res, err := apt.Call(finalURL, req.Header)
	ret := types.QueryGetAccountResourcesResponse(*res)
	return &ret, err
}
