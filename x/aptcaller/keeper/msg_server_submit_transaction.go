package keeper

import (
	"context"

	"aptcaller/x/aptcaller/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) SubmitTransaction(goCtx context.Context, msg *types.MsgSubmitTransaction) (*types.MsgSubmitTransactionResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx
	k.SaveTx(ctx, types.AptTx{
		Creator: msg.Creator,
		AptTx:   msg.Body,
		Id:      0,
	})
	// chainUrl, err := apt.ParseChain(msg.Header)
	// if err != nil {
	// 	return nil, err
	// }
	// finalURL := fmt.Sprintf("%s/transactions", chainUrl)
	// body, err := hex.DecodeString(msg.Body)
	// if err != nil {
	// 	return nil, status.Error(codes.InvalidArgument, "parse body error")
	// }
	// res, err := apt.Post(finalURL, string(body), msg.Header)
	// ctx.EventManager().EmitEvent(
	// 	sdk.NewEvent("SubmitTransactionEvent",
	// 		sdk.NewAttribute("body", msg.Body),
	// 		sdk.NewAttribute("header", "header"),
	// 		sdk.NewAttribute("code", strconv.FormatUint(uint64(200), 10)),
	// 	),
	// )
	ret := types.MsgSubmitTransactionResponse{
		AptRes: &types.AptRes{
			Body:   msg.Body,
			Header: "header",
			Code:   200,
		},
	}
	return &ret, nil
}
