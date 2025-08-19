<?xml version="1.0" encoding="utf-8"?>
<?AutomationStudio FileVersion="4.9"?>
<SwConfiguration CpuAddress="SL1" xmlns="http://br-automation.co.at/AS/SwConfiguration">
  <TaskClass Name="Cyclic#1">
    <Task Name="FirstInitP" Source="Infrastructure.FirstInitProg.prg" Memory="UserROM" Language="ANSIC" Debugging="true" />
    <Task Name="VFLCR_HMI" Source="" Memory="UserROM" Language="Binary" Debugging="true" />
  </TaskClass>
  <TaskClass Name="Cyclic#2">
    <Task Name="VFLCR_Ope0" Source="ProcessControl.VFLCR.VFLCR_Operation.prg" Memory="UserROM" Description="                  " Language="IEC" Debugging="true" />
    <Task Name="VFLCR_Ope1" Source="ProcessControl.VFLCR.VFLCR_Operation.prg" Memory="UserROM" Description="                  " Language="IEC" Debugging="true" />
    <Task Name="VFLCR_Ope2" Source="ProcessControl.VFLCR.VFLCR_Operation.prg" Memory="UserROM" Description="                  " Language="IEC" Debugging="true" />
    <Task Name="VFLCR_Ope3" Source="ProcessControl.VFLCR.VFLCR_Operation.prg" Memory="UserROM" Description="                  " Language="IEC" Debugging="true" />
    <Task Name="AlarmWrap" Source="Infrastructure.Alarms.AlarmWrap.prg" Memory="UserROM" Language="IEC" Debugging="true" />
  </TaskClass>
  <TaskClass Name="Cyclic#3" />
  <TaskClass Name="Cyclic#4">
    <Task Name="atnDriver" Source="Infrastructure.atnDriver.prg" Memory="UserROM" Language="IEC" Debugging="true" />
    <Task Name="DataDis" Source="Automation.DataDistributionSFC.prg" Memory="UserROM" Language="IEC" Debugging="true" />
    <Task Name="SFCControl" Source="Automation.SFCControl.prg" Memory="UserROM" Language="IEC" Debugging="true" />
    <Task Name="VFLCR_Syst" Source="ProcessControl.VFLCR.VFLCR_System.prg" Memory="UserROM" Description="                     " Language="IEC" Debugging="true" />
    <Task Name="RM_BuildIn" Source="ProcessControl.PrintJobManagement.RM_BuildInfo.prg" Memory="UserROM" Language="IEC" Debugging="true" />
    <Task Name="RM_PrintPr" Source="ProcessControl.PrintJobManagement.RM_PrintProcessConfig.prg" Memory="UserROM" Language="IEC" Debugging="true" />
    <Task Name="PrintJobMa" Source="ProcessControl.PrintJobManagement.PrintJobManagement.prg" Memory="UserROM" Language="IEC" Debugging="true" />
    <Task Name="BuildDistr" Source="ProcessControl.PrintJobManagement.BuildDistributor.prg" Memory="UserROM" Language="IEC" Debugging="true" />
  </TaskClass>
  <TaskClass Name="Cyclic#5" />
  <TaskClass Name="Cyclic#6" />
  <TaskClass Name="Cyclic#7" />
  <TaskClass Name="Cyclic#8">
    <Task Name="RevInfo" Source="Infrastructure.RevInfo.RevInfo.prg" Memory="UserROM" Language="IEC" Debugging="true" />
  </TaskClass>
  <DataObjects>
    <DataObject Name="McAcpSys" Source="" Memory="UserROM" Language="Binary" />
  </DataObjects>
  <NcDataObjects>
    <NcDataObject Name="McDriveLog" Source="" Memory="UserROM" Language="Binary" />
  </NcDataObjects>
  <Binaries>
    <BinaryObject Name="mvLoader" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="TCData" Source="" Memory="SystemROM" Language="Binary" />
    <BinaryObject Name="FWRules" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="mcacpdrv" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="udbdef" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="mCoWebSc" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="McProfGen" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="TCLang" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="arcoal" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="arflatprv" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="arsvcreg" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="Role" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="arconfig" Source="" Memory="SystemROM" Language="Binary" />
    <BinaryObject Name="User" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="asfw" Source="" Memory="SystemROM" Language="Binary" />
    <BinaryObject Name="ashwd" Source="" Memory="SystemROM" Language="Binary" />
    <BinaryObject Name="ashwac" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="sysconf" Source="" Memory="SystemROM" Language="Binary" />
    <BinaryObject Name="iomap" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="MachineAH" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="MachineAC" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="MachineCG" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="Settings" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="TC" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="Recipies" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="Settings_1" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="UserMgmt" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="UserLogin" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="McAcpSim" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="McMechSys" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="GantryMech" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="RectrCfg" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="Hierarchy" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="GantryGrp" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="GantryCfg" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="CncFeature" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="VAx" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="Config" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="LiftCfg" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="ShuttleCfg" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="AxFeatures" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="asiol2" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="asiol1" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="Config_1" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="AirlockCfg" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="HopperCfg" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="PermMemAC" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="RecoaterAC" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="CNCAC" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="InitCG" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="PermMemCG" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="CNCCG" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="RecoaterCG" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="InitAC" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="AxBasicCG" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="AxBasicAC" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="LaserCG" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="LaserAC" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="CoolingCG" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="GearLiftAC" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="CoolingAC" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="VisionAC" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="VisionCG" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="FilterCG" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="FilterAC" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="PumpsAC" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="PumpsCG" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="LiftZAC" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="RecoatXAC" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="GantryXAC" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="GasAC" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="LiftCG" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="SafetyAC" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="SafetyCG" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="LiftAC" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="GasCG" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="GearLiftCG" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="GearingCG" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="DriversCG" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="DriversAC" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="SubsCG" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="SubsAC" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="ServoMgrCG" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="ServoMgrAC" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="gAxis" Source="" Memory="UserROM" Language="Binary" />
  </Binaries>
  <Libraries>
    <LibraryObject Name="errorAPI" Source="Libraries.Loupe.errorAPI.lby" Memory="UserROM" Language="ANSIC" Debugging="true" />
    <LibraryObject Name="McBase" Source="Libraries.AS.McBase.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="SfDomain" Source="Libraries.AS.SfDomain.lby" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="MpBase" Source="Libraries.AS.MpBase.lby" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="CoTrace" Source="Libraries.AS.CoTrace.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="AsZip" Source="Libraries.AS.AsZip.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="FileIO" Source="Libraries.AS.FileIO.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="runtime" Source="Libraries.AS.runtime.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="fiowrap" Source="Libraries.Loupe.fiowrap.lby" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="hmitools" Source="Libraries.Loupe.hmitools.lby" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="logthat" Source="Libraries.Loupe.logthat.lby" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="ringbuflib" Source="Libraries.Loupe.ringbuflib.lby" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="piper" Source="Libraries.Loupe.piper.lby" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="DataBuffer" Source="Libraries.Loupe.DataBuffer.lby" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="AsGuard" Source="Libraries.AS.AsGuard.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="AsIODiag" Source="Libraries.AS.AsIODiag.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="sys_lib" Source="Libraries.AS.sys_lib.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="AsBrStr" Source="Libraries.AS.AsBrStr.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="standard" Source="Libraries.AS.standard.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="AsArLog" Source="Libraries.AS.AsArLog.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="ArEventLog" Source="Libraries.AS.ArEventLog.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="AsHttp" Source="Libraries.AS.AsHttp.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="AsBrWStr" Source="Libraries.AS.AsBrWStr.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="AsTCP" Source="Libraries.AS.AsTCP.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="MpAxis" Source="Libraries.AS.MpAxis.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="McAxis" Source="Libraries.AS.McAxis.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="MpAlarmX" Source="Libraries.AS.MpAlarmX.lby" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="stringext" Source="Libraries.Loupe.stringext.lby" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="bodyguard" Source="Libraries.Loupe.bodyguard.lby" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="tcpcomm" Source="Libraries.Loupe.tcpcomm.lby" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="astime" Source="Libraries.AS.astime.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="McAcpAx" Source="Libraries.AS.McAcpAx.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="messagebox" Source="Libraries.Loupe.messagebox.lby" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="MpCnc" Source="Libraries.AS.MpCnc.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="McAxGroup" Source="Libraries.AS.McAxGroup.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="McPathGen" Source="Libraries.AS.McPathGen.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="McProgInt" Source="Libraries.AS.McProgInt.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="omjson" Source="Libraries.Loupe.omjson.lby" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="VFAlarms" Source="Libraries.VF.VFAlarms.lby" Memory="UserROM" Language="ANSIC" Debugging="true" />
    <LibraryObject Name="MpCom" Source="Libraries.AS.MpCom.lby" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="AsXml" Source="Libraries.AS.AsXml.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="McPureVAx" Source="Libraries.AS.McPureVAx.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="ToolBox" Source="Libraries.VF.ToolBox.lby" Memory="UserROM" Language="ANSIC" Debugging="true" />
    <LibraryObject Name="Finder" Source="Libraries.Loupe.Finder.lby" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="VF_COMMON" Source="Libraries.VF.VF_COMMON.lby" Memory="UserROM" Language="IEC" Debugging="true" />
    <LibraryObject Name="LoopCont" Source="Libraries.AS.LoopCont.lby" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="MTData" Source="Libraries.AS.MTData.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="MTTypes" Source="Libraries.AS.MTTypes.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="LoopConR" Source="Libraries.AS.LoopConR.lby" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="AsBrMath" Source="Libraries.AS.AsBrMath.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="MpRecipe" Source="Libraries.AS.MpRecipe.lby" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="brsystem" Source="Libraries.AS.brsystem.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="VFValve" Source="Libraries.VF.VFValve.lby" Memory="UserROM" Language="IEC" Debugging="true" />
    <LibraryObject Name="axislib" Source="Libraries.Loupe.axislib.lby" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="hammers" Source="Libraries.Loupe.hammers.lby" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="MTLookUp" Source="Libraries.AS.MTLookUp.lby" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="AsIoTime" Source="Libraries.AS.AsIoTime.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="AsARCfg" Source="Libraries.AS.AsARCfg.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="UnitTest" Source="Libraries.Testing.UnitTest.lby" Memory="None" Language="ANSIC" Debugging="true" />
    <LibraryObject Name="UtMgr" Source="Libraries.Testing.UtMgr.lby" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="UtWs" Source="Libraries.Testing.UtWs.lby" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="MpWebXs" Source="Libraries.AS.MpWebXs.lby" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="AsArSdm" Source="Libraries.AS.AsArSdm.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="atn" Source="Libraries.Loupe.atn.lby" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="MTBasics" Source="Libraries.MTBasics.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="VF_PARSER" Source="Libraries.VF.VF_PARSER.lby" Memory="UserROM" Language="IEC" Debugging="true" />
    <LibraryObject Name="IotMqtt" Source="Libraries.AS.IotMqtt.lby" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="AsIecCon" Source="Libraries.AS.AsIecCon.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="ArCert" Source="Libraries.ArCert.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="AsHW" Source="Libraries.AsHW.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="AsETH" Source="Libraries.AsETH.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="MpUserX" Source="Libraries.AS.MpUserX.lby" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="csvfilelib" Source="Libraries.Loupe.csvfilelib.lby" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="persist" Source="Libraries.Loupe.persist.lby" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="vartools" Source="Libraries.Loupe.vartools.lby" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="MpSfDomMgr" Source="" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="SfDomDrv" Source="" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="SfDomVis" Source="" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="asepl" Source="" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="powerlnk" Source="" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="aruser" Source="" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="dataobj" Source="" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="asusb" Source="" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="operator" Source="" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="arssl" Source="" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="asio" Source="" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="asmem" Source="" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="asarprof" Source="" Memory="UserROM" Language="Binary" Debugging="true" />
  </Libraries>
</SwConfiguration>