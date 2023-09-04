@echo off

for /L %%i in (1, 1, 10) do (
    call %%i.bat
)

echo Todos os arquivos foram chamados.
