SHELL := cmd.exe
CYGWIN=nontsec
export PATH := C:\Windows\system32;C:\Windows;C:\Windows\System32\Wbem;C:\Windows\System32\WindowsPowerShell\v1.0\;C:\Program Files (x86)\NVIDIA Corporation\PhysX\Common;C:\Program Files\NVIDIA Corporation\NVIDIA NvDLISR;C:\WINDOWS\system32;C:\WINDOWS;C:\WINDOWS\System32\Wbem;C:\WINDOWS\System32\WindowsPowerShell\v1.0\;C:\Program Files\Git\cmd;C:\Program Files\Git LFS;C:\Program Files\nodejs;C:\Program Files\PuTTY\;C:\Program Files (x86)\Common Files\Pleora\eBUS SDK;C:\Program Files\Common Files\Pleora\eBUS SDK;C:\Users\hkeshavamurthy\AppData\Local\Microsoft\WindowsApps;C:\Users\hkeshavamurthy\AppData\Local\gitkraken\bin;C:\Users\hkeshavamurthy\AppData\Local\Programs\Microsoft VS Code\bin;C:\Program Files (x86)\Common Files\Hilscher GmbH\TLRDecode;C:\Users\hkeshavamurthy\AppData\Roaming\npm;C:\Users\hkeshavamurthy\AppData\Local\Microsoft\WindowsApps;C:\Users\hkeshavamurthy\AppData\Local\gitkraken\bin;C:\Users\hkeshavamurthy\AppData\Local\Programs\Microsoft VS Code\bin;C:\Program Files (x86)\Common Files\Hilscher GmbH\TLRDecode;C:\Users\hkeshavamurthy\AppData\Roaming\npm;C:\Users\hkeshavamurthy\AS411\bin-en\4.11;C:\Users\hkeshavamurthy\AS411\bin-en\4.10;C:\Users\hkeshavamurthy\AS411\bin-en\4.9;C:\Users\hkeshavamurthy\AS411\bin-en\4.8;C:\Users\hkeshavamurthy\AS411\bin-en\4.7;C:\Users\hkeshavamurthy\AS411\bin-en\4.6;C:\Users\hkeshavamurthy\AS411\bin-en\4.5;C:\Users\hkeshavamurthy\AS411\bin-en\4.4;C:\Users\hkeshavamurthy\AS411\bin-en\4.3;C:\Users\hkeshavamurthy\AS411\bin-en\4.2;C:\Users\hkeshavamurthy\AS411\bin-en\4.1;C:\Users\hkeshavamurthy\AS411\bin-en\4.0;C:\Users\hkeshavamurthy\AS411\bin-en
export AS_BUILD_MODE := Rebuild
export AS_VERSION := 4.11.3.51 SP
export AS_WORKINGVERSION := 4.11
export AS_COMPANY_NAME :=  
export AS_USER_NAME := hkeshavamurthy
export AS_PATH := C:/Users/hkeshavamurthy/AS411
export AS_BIN_PATH := C:/Users/hkeshavamurthy/AS411/bin-en
export AS_PROJECT_PATH := C:/DataDistributionTest/DataDistributionTest
export AS_PROJECT_NAME := ControlPLC_DataDistribution
export AS_SYSTEM_PATH := C:/Users/hkeshavamurthy/AS/System
export AS_VC_PATH := C:/Users/hkeshavamurthy/AS411/AS/VC
export AS_TEMP_PATH := C:/DataDistributionTest/DataDistributionTest/Temp
export AS_CONFIGURATION := APC910
export AS_BINARIES_PATH := C:/DataDistributionTest/DataDistributionTest/Binaries
export AS_GNU_INST_PATH := C:/Users/hkeshavamurthy/AS411/AS/GnuInst/V4.1.2
export AS_GNU_BIN_PATH := C:/Users/hkeshavamurthy/AS411/AS/GnuInst/V4.1.2/4.9/bin
export AS_GNU_INST_PATH_SUB_MAKE := C:/Users/hkeshavamurthy/AS411/AS/GnuInst/V4.1.2
export AS_GNU_BIN_PATH_SUB_MAKE := C:/Users/hkeshavamurthy/AS411/AS/GnuInst/V4.1.2/4.9/bin
export AS_INSTALL_PATH := C:/Users/hkeshavamurthy/AS411
export WIN32_AS_PATH := "C:\Users\hkeshavamurthy\AS411"
export WIN32_AS_BIN_PATH := "C:\Users\hkeshavamurthy\AS411\bin-en"
export WIN32_AS_PROJECT_PATH := "C:\DataDistributionTest\DataDistributionTest"
export WIN32_AS_SYSTEM_PATH := "C:\Users\hkeshavamurthy\AS\System"
export WIN32_AS_VC_PATH := "C:\Users\hkeshavamurthy\AS411\AS\VC"
export WIN32_AS_TEMP_PATH := "C:\DataDistributionTest\DataDistributionTest\Temp"
export WIN32_AS_BINARIES_PATH := "C:\DataDistributionTest\DataDistributionTest\Binaries"
export WIN32_AS_GNU_INST_PATH := "C:\Users\hkeshavamurthy\AS411\AS\GnuInst\V4.1.2"
export WIN32_AS_GNU_BIN_PATH := "C:\Users\hkeshavamurthy\AS411\AS\GnuInst\V4.1.2\bin"
export WIN32_AS_INSTALL_PATH := "C:\Users\hkeshavamurthy\AS411"

.suffixes:

ProjectMakeFile:

	@'$(AS_BIN_PATH)/4.9/BR.AS.AnalyseProject.exe' '$(AS_PROJECT_PATH)/ControlPLC_DataDistribution.apj' -t '$(AS_TEMP_PATH)' -c '$(AS_CONFIGURATION)' -o '$(AS_BINARIES_PATH)'   -sfas -buildMode 'Rebuild'   

