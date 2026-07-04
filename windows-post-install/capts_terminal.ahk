#Requires AutoHotkey v2.0

; только Windows Terminal
#HotIf WinActive("ahk_exe WindowsTerminal.exe")

CapsLock::
{
    global capsDown := true
    global capsHandled := false

    ; если отпустили быстро → Esc
    SetTimer CapsTapCheck, -150
}

CapsLock Up::
{
    global capsDown, capsHandled

    capsDown := false

    if !capsHandled
        Send "{Esc}"
}

CapsTapCheck()
{
    global capsDown, capsHandled

    if capsDown
    {
        capsHandled := true
        Send "{Ctrl down}"

        KeyWait "CapsLock"
        Send "{Ctrl up}"
        capsDown := false
    }
}

#HotIf