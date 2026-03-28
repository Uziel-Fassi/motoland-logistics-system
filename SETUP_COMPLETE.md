# 🎯 Motoland - Configuración Completada

## ✅ Lo que se hizo:

### 1. **URL Limpia** 
   - ✨ Antes: `http://localhost:8080/miloginwebcontodo-1.0-SNAPSHOT`
   - ✨ Ahora: `http://localhost:8080/motoland`
   
   Cambios realizados:
   - `pom.xml`: artifactId = `motoland` + `<finalName>motoland</finalName>`
   - WAR generado: `target/motoland.war` ✓

### 2. **Flujo de Arranque con Un Click**
   Se configuraron dos formas de iniciar:

## 🚀 OPCIÓN 1: Script PowerShell (Recomendado)

```powershell
.\start-motoland.ps1
```

Esto hace automáticamente:
1. Build con Maven ✅
2. Copia WAR a Tomcat ✅
3. Inicia Tomcat ✅
4. Abre http://localhost:8080/motoland en el navegador ✅

## 🚀 OPCIÓN 2: VS Code (Un clic visual)

### Requiere: TOMCAT_HOME configurado

En PowerShell como admin:
```powershell
[Environment]::SetEnvironmentVariable("TOMCAT_HOME", "C:\Users\HP\tomcat", "User")
```
(Reemplaza con tu ruta real de Tomcat)

Luego en VS Code:
- **Presiona `Ctrl + Shift + B`** (Build shortcut)
- Selecciona: **"🚀 START MOTOLAND"**
- Se ejecuta todo automáticamente

## 📋 Tareas Disponibles en VS Code

Presiona **Ctrl + Shift + P** → "Tasks: Run Task"

| Tarea | Función |
|-------|---------|
| 🏗️ build: motoland | Compilar proyecto |
| 📦 deploy: motoland | Copiar WAR a Tomcat |
| ▶️ start: tomcat | Iniciar Tomcat |
| ⏹️ stop: tomcat | Detener Tomcat |
| 🚀 START MOTOLAND | **TODO: build + deploy + start** |

## 📁 Archivos Creados/Modificados

```
ProyectoFinalMotoland2/
├── pom.xml ............................ [MODIFICADO] finalName=motoland
├── .vscode/tasks.json ................. [ACTUALIZADO] referencias WAR + labels
├── start-motoland.ps1 ................. [NUEVO] Script rápido
├── update-tasks.ps1 ................... [NUEVO] Utilitario
├── QUICKSTART.md ...................... [NUEVO] Guía de inicio
└── SETUP_COMPLETE.md .................. [NUEVO] Este archivo
```

## 🔧 Configuración de Tomcat

Si aún no tienes Tomcat configurado:

1. **Descargar Tomcat 9.0.109**
   ```
   https://archive.apache.org/dist/tomcat/tomcat-9/v9.0.109/
   ```

2. **Extraer a carpeta (ej: C:\Users\HP\tomcat)**

3. **Configurar TOMCAT_HOME** (Variable de entorno global)
   - Windows: Settings > Environment Variables
   - Variable: `TOMCAT_HOME` = `C:\Users\HP\tomcat`
   - Reinicia PowerShell/VS Code

4. **Verificar configuración**
   ```powershell
   $env:TOMCAT_HOME
   Test-Path "$env:TOMCAT_HOME\bin\startup.bat"  # Debe mostrar True
   ```

## 🎯 Próximo Paso

⚡ **Ejecuta tu primer arranque:**

```powershell
.\start-motoland.ps1
```

Debería:
- ✅ Compilar
- ✅ Desplegar
- ✅ Iniciar Tomcat
- ✅ Abrir navegador en http://localhost:8080/motoland

## 📝 Notas Importantes

- **Puerto de Tomcat**: 8080 (modificable en `$TOMCAT_HOME/conf/server.xml`)
- **BD MySQL**: Debe estar corriendo con la configuración de `DatabaseConnection.java`
- **Java**: Compilado para Java 1.8
- **Build**: Toma ~10-15 segundos primera vez

## ❓ Problemas Comunes

| Problema | Solución |
|----------|----------|
| `TOMCAT_HOME not found` | Configura la variable de entorno (ver paso 3 arriba) |
| `Port 8080 already in use` | Cierra la instancia anterior de Tomcat o cambia puerto |
| `WAR not found` | Asegúrate de ejecutar el build primero |
| `Connection refused (MySQL)` | Verifica que MySQL está corriendo |

## 🎉 ¡Listo!

Tu aplicación Motoland ya está completamente configurada para arrancar con un clic.
Disfruta el desarrollo! 🏍️
