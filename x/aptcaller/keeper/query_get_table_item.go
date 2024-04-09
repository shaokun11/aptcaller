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

func (k Keeper) GetTableItem(goCtx context.Context, req *types.QueryGetTableItemRequest) (*types.QueryGetTableItemResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Process the query
	_ = ctx
	baseURL := fmt.Sprintf("%s/tables/%s/item", apt.Url, req.TableHandle)
	urlObj, _ := url.Parse(baseURL)
	params := url.Values{}
	if apt.IsValidQueryStringNum(req.LedgerVersion) {
		params.Add("ledger_version", req.LedgerVersion)
	}
	urlObj.RawQuery = params.Encode()
	finalURL := urlObj.String()
	res, err := apt.Post(finalURL, req.Body, apt.HeaderJsonAll)
	ret := types.QueryGetTableItemResponse(*res)
	return &ret, err
}
