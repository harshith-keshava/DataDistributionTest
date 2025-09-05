/* Automation Studio generated header file */
/* Do not edit ! */

#ifndef _BUR_1757105362_13_
#define _BUR_1757105362_13_

#include <bur/plctypes.h>

/* Datatypes and datatypes of function blocks */
typedef enum ProcessParameters
{	CONTINUOUS_MODE_ENABLE = 1,
	GAS_FLOW_LPM,
	REC_SPREAD_MOVE_VEL,
	REC_APPROACH_MOVE_VEL,
	ELECTRODE_ENABLE,
	ELECTRODE_GAIN_PERCENT,
	MH_INITIAL_DISP_ROTATIONS,
	MH_CONT_DISP_ROTATIONS,
	AI_MAX_RECOAT_LIMIT
} ProcessParameters;

typedef struct BuildCoordinate_typ
{	float X;
	float Y;
	float Z;
} BuildCoordinate_typ;

typedef struct BuildVolumeExtents_typ
{	struct BuildCoordinate_typ min;
	struct BuildCoordinate_typ max;
} BuildVolumeExtents_typ;

typedef struct BuildSoftwareInfoDetails_typ
{	plcstring version[21];
	plcstring branch[21];
	plcstring commit[61];
} BuildSoftwareInfoDetails_typ;

typedef struct BuildSoftwareInfo_typ
{	struct BuildSoftwareInfoDetails_typ Configuration_Editor;
	struct BuildSoftwareInfoDetails_typ Raster_Engine;
} BuildSoftwareInfo_typ;

typedef struct BuildPrinterInfo_typ
{	plcstring name[21];
	unsigned short vfpmap_version;
	float encoder_tick_width;
	float max_gantry_speed;
	float max_gantry_acceleration;
	unsigned short max_laser_count;
	float laser_line_angle;
	float head_center_offset;
	float laser_spacing;
	float min_laser_watts;
	float max_laser_watts;
	plcstring phy_laser_encoding[21];
	float gantry_max_pos_x;
	float gantry_max_pos_y;
	float gantry_min_pos_x;
	float gantry_min_pos_y;
} BuildPrinterInfo_typ;

typedef struct BuildInstanceInfo_typ
{	plcstring base_unique_id[41];
	struct BuildPrinterInfo_typ PrinterInfo;
	plcbit active_pixels[148];
} BuildInstanceInfo_typ;

typedef struct BuildInformation_typ
{	plcstring base_filename[21];
	unsigned short build_iter;
	unsigned long build_layout;
	unsigned short print_number;
	unsigned short num_layers;
	float layer_height;
	unsigned long num_trajectories_x;
	unsigned long num_trajectories_y;
	unsigned short num_intralayer_gashead_cleans;
	float avg_trajectory_length_y;
	unsigned long total_cooling_delay;
	float avg_trajectory_length_x;
	float trajectory_velocity;
	float trajectory_acceleration;
	float index_velocity;
	float index_acceleration;
	unsigned char platform_id;
	plcstring description[81];
	plcstring author[41];
	plcstring print_owner[41];
	plcstring platform_name[21];
	plcstring cmmFilename[101];
	unsigned short CameraCalibration;
	plcbit SubPlateInUse;
	struct BuildVolumeExtents_typ build_volume_limits;
	struct BuildSoftwareInfo_typ SoftwareInfo;
	struct BuildInstanceInfo_typ BuildInstanceInfo;
	struct BuildPrinterInfo_typ BuildPrinterInfo;
} BuildInformation_typ;

typedef struct LayerSpecificValues_typ
{	float LayerValue;
	signed short LayerStart;
	signed short LayerEnd;
} LayerSpecificValues_typ;

#ifdef _BUR_USE_DECLARATION_IN_IEC
typedef struct ParamterSetpoints_typ
{	plcstring Name[51];
	plcbit Used;
	plcstring EngineeringUnits[26];
	plcstring ParDataType[11];
	float HmiRangeMin;
	float HmiRangeMax;
	float FixedValue;
	plcbit EnableLayerRangeChanges;
	unsigned char NumberOfLayerValuesUsed;
	struct LayerSpecificValues_typ LayerSpecificValues[8];
} ParamterSetpoints_typ;
#else
/* Data type ParamterSetpoints_typ not declared. Data types with array elements whose starting indexes are not equal to zero cannot be used in ANSI C programs / libraries.*/
#endif

#ifdef _BUR_USE_DECLARATION_IN_IEC
typedef struct PrintProcessConfig_typ
{	plcstring MachineName[6];
	plcstring Description[256];
	signed short FileFormatVersion;
	plcstring DateTimeGenerated[31];
	struct ParamterSetpoints_typ ParamterSetpoints[9];
} PrintProcessConfig_typ;
#else
/* Data type PrintProcessConfig_typ not declared. Data types with array elements whose starting indexes are not equal to zero cannot be used in ANSI C programs / libraries.*/
#endif

typedef struct DerivedProcessParameters_typ
{	plcstring Name[51];
	plcbit Used;
	plcstring EngineeringUnits[26];
	plcstring ParDataType[11];
	float HmiRangeMin;
	float HmiRangeMax;
	float DerivedValue;
} DerivedProcessParameters_typ;






__asm__(".section \".plc\"");

/* Used IEC files */
__asm__(".ascii \"iecfile \\\"Logical/ProcessControl/PrintJobManagement/BuildInformation.typ\\\" scope \\\"global\\\"\\n\"");

/* Additional IEC dependencies */
__asm__(".ascii \"iecdep \\\"Logical/ProcessControl/PrintJobManagement/Variables.var\\\" scope \\\"global\\\"\\n\"");

/* Exported library functions and function blocks */

__asm__(".previous");


#endif /* _BUR_1757105362_13_ */

