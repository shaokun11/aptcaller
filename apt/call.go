package apt

import (
	"aptcaller/x/aptcaller/types"
	"bytes"
	"encoding/json"
	"io"
	"net/http"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type Header struct {
	Epoch      string `json:"X-Aptos-Epoch"`
	Height     string `json:"X-Aptos-Block-Height"`
	OldHeight  string `json:"X-Aptos-Oldest-Block-Height"`
	ChainId    string `json:"X-Aptos-Chain-Id"`
	Version    string `json:"X-Aptos-Ledger-Version"`
	OldVersion string `json:"X-Aptos-Ledger-Oldest-Version"`
	Ts         string `json:"X-Aptos-Ledger-Timestampusec"`
	Cursor     string `json:"X-APTOS-CURSOR"`
}

func Call(url, headerStr string) (*types.QueryGetAccountResponse, error) {
	client := &http.Client{}
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, status.Error(codes.Unavailable, err.Error())
	}
	headers := ParseHeader(headerStr)
	for key, value := range headers {
		req.Header.Set(key, value)
	}
	resp, err := client.Do(req)
	if err != nil {
		return nil, status.Error(codes.Unavailable, err.Error())
	}
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	if err != nil {

		return nil, status.Error(codes.Internal, err.Error())
	}
	headerBytes, _ := json.Marshal(Header{
		Epoch:      resp.Header.Get("X-Aptos-Epoch"),
		Height:     resp.Header.Get("X-Aptos-Block-Height"),
		OldHeight:  resp.Header.Get("X-Aptos-Oldest-Block-Height"),
		ChainId:    resp.Header.Get("X-Aptos-Chain-Id"),
		Version:    resp.Header.Get("X-Aptos-Ledger-Version"),
		OldVersion: resp.Header.Get("X-Aptos-Ledger-Oldest-Version"),
		Ts:         resp.Header.Get("X-Aptos-Ledger-Timestampusec"),
		Cursor:     resp.Header.Get("X-APTOS-CURSOR"),
	})
	return &types.QueryGetAccountResponse{
		AptRes: &types.AptRes{
			Header: string(headerBytes),
			Body:   string(body),
			Code:   uint32(resp.StatusCode),
		},
	}, nil
}

func Post(url string, payload string, headerStr string) (*types.QueryGetAccountResponse, error) {
	client := &http.Client{}
	req, err := http.NewRequest("POST", url, bytes.NewBuffer([]byte(payload)))
	if err != nil {
		return nil, status.Error(codes.Unavailable, err.Error())
	}
	headers := ParseHeader(headerStr)
	for key, value := range headers {
		req.Header.Set(key, value)
	}
	resp, err := client.Do(req)
	if err != nil {
		return nil, status.Error(codes.Unavailable, err.Error())
	}
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}
	headerBytes, _ := json.Marshal(Header{
		Epoch:      resp.Header.Get("X-Aptos-Epoch"),
		Height:     resp.Header.Get("X-Aptos-Block-Height"),
		OldHeight:  resp.Header.Get("X-Aptos-Oldest-Block-Height"),
		ChainId:    resp.Header.Get("X-Aptos-Chain-Id"),
		Version:    resp.Header.Get("X-Aptos-Ledger-Version"),
		OldVersion: resp.Header.Get("X-Aptos-Ledger-Oldest-Version"),
		Ts:         resp.Header.Get("X-Aptos-Ledger-Timestampusec"),
		Cursor:     resp.Header.Get("X-APTOS-CURSOR"),
	})
	return &types.QueryGetAccountResponse{
		AptRes: &types.AptRes{
			Header: string(headerBytes),
			Body:   string(body),
			Code:   uint32(resp.StatusCode),
		},
	}, nil
}

func PostRaw(url string, payload string) (*types.QueryGetAccountResponse, error) {
	resp, err := http.Post(url, "application/json", bytes.NewBuffer([]byte(payload)))
	if err != nil {
		return nil, status.Error(codes.Unavailable, err.Error())
	}
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}
	return &types.QueryGetAccountResponse{
		AptRes: &types.AptRes{
			Header: "{}",
			Body:   string(body),
			Code:   200,
		},
	}, nil
}
