@echo off
cd /d "%~dp0"
python iniciar.py
if errorlevel 1 (
  echo No se pudo iniciar. Verifique que Python este instalado.
  pause
)
