{ pkgs ? import <nixpkgs> {} }:

let
  poetryEnv = pkgs.poetry2nix.mkPoetryEnv {
    projectDir = ./.;
    editablePackageSources = {
    };
  };
in
pkgs.mkShell {
  buildInputs = with pkgs; [
    poetry
    # poetryEnv
    nodejs
  ];
}
