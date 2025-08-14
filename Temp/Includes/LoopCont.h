/* Automation Studio generated header file */
/* Do not edit ! */
/* LoopCont 3.10.0 */

#ifndef _LOOPCONT_
#define _LOOPCONT_
#ifdef __cplusplus
extern "C" 
{
#endif
#ifndef _LoopCont_VERSION
#define _LoopCont_VERSION 3.10.0
#endif

#include <bur/plctypes.h>

#ifndef _BUR_PUBLIC
#define _BUR_PUBLIC
#endif
#ifdef _SG4
		#include "brsystem.h"
		#include "sys_lib.h"
#endif
#ifdef _SG3
		#include "brsystem.h"
		#include "sys_lib.h"
#endif
#ifdef _SGC
		#include "brsystem.h"
		#include "sys_lib.h"
#endif

/* Constants */
#ifdef _REPLACE_CONST
 #define LC_ERROR 12025U
 #define LC_ERR_MAXMIN 12037U
 #define LC_WARN_Tx_DT 12007U
 #define LCPID_D_MODE_E 2U
 #define LCPID_D_MODE_X 1U
 #define LC_ERR_LCPT1_T 12031U
 #define LC_ERR_POINTER 31563U
 #define LC_ERR_DISABLED 65534U
 #define LCSLIMPID_REQU_P 300U
 #define LCPID_TUNE_REQU_P 300U
 #define LCSLIMPID_REQU_PI 200U
 #define LCDBLPID_TSTATE_Y1 1U
 #define LCDBLPID_TSTATE_Y2 2U
 #define LCPID_OUT_MODE_MAN 2U
 #define LCPID_OUT_MODE_OFF 0U
 #define LCPID_TUNE_REQU_PI 200U
 #define LCSLIMPID_REQU_OFF 0U
 #define LCSLIMPID_REQU_PID 100U
 #define LC_ERR_LCPID_IDENT 31552U
 #define LCDBLPID_TSTATE_OFF 0U
 #define LCPID_OUT_MODE_AUTO 1U
 #define LCPID_OUT_MODE_OPEN 3U
 #define LCPID_TUNE_REQU_OFF 0U
 #define LCPID_TUNE_REQU_PID 100U
 #define LC_ERR_LCPID_PAR_KP 12026U
 #define LC_ERR_LCPID_PAR_KW 12027U
 #define LC_ERR_LCPID_PAR_TF 12028U
 #define LC_ERR_LCPID_PAR_TN 12029U
 #define LC_ERR_LCPID_PAR_TV 12030U
 #define LC_WARN_DT_MAXLIMIT 12000U
 #define LCDBLPID_MODE_TUNE_4 6U
 #define LCDBLPID_MODE_TUNE_6 7U
 #define LCPID_CALC_MODE_FAST 2U
 #define LCPID_OUT_MODE_CLOSE 4U
 #define LCSLIMPID_REQU_OSC_1 10000U
 #define LCSLIMPID_REQU_OSC_2 20000U
 #define LCSLIMPID_REQU_OSC_3 30000U
 #define LCSLIMPID_REQU_PER_3 300000U
 #define LCSLIMPID_REQU_PER_4 400000U
 #define LCSLIMPID_REQU_PER_5 500000U
 #define LC_ERR_LCPID_OUTMODE 31553U
 #define LC_ERR_LCPID_PARADAT 31554U
 #define LC_ERR_LCPWM_TPERIOD 12033U
 #define LCDBLPID_MODE_TUNE_Y1 8U
 #define LCDBLPID_MODE_TUNE_Y2 9U
 #define LCDBLPID_TSTATE_ERROR 4U
 #define LCPID_CALC_MODE_EXACT 1U
 #define LCPID_FBK_MODE_EXTERN 2U
 #define LCPID_FBK_MODE_INTERN 1U
 #define LCPID_OUT_MODE_FREEZE 5U
 #define LCPID_TUNE_REQU_OSC_1 10000U
 #define LCPID_TUNE_REQU_OSC_2 20000U
 #define LCPID_TUNE_REQU_OSC_3 30000U
 #define LCPID_TUNE_REQU_PER_3 300000U
 #define LCPID_TUNE_REQU_PER_4 400000U
 #define LCPID_TUNE_REQU_PER_5 500000U
 #define LC_ERR_LCDBLPID_DX_DT 31562U
 #define LC_ERR_LCIntegrate_TN 31550U
 #define LC_ERR_LCPID_PAR_KFBK 12025U
 #define LC_ERR_LCPWM_TMINPULS 12032U
 #define LC_WARN_LCxPHy_XSTART 12006U
 #define LCPIDAUTOTUNE_REQU_OFF 0U
 #define LCPID_TUNE_STATE_READY 0U
 #define LCSLIMPID_REQU_DIR_NEG 20U
 #define LCSLIMPID_REQU_DIR_POS 10U
 #define LCSLIMPID_REQU_ZN_DIST 3000U
 #define LC_ERR_LCDBLPID_WX_LOW 31561U
 #define LC_ERR_LCPIDTune_ABORT 12038U
 #define LC_ERR_LCPID_PAR_DMODE 31556U
 #define LC_ERR_LCPID_PAR_DYMAX 31557U
 #define LCPID_TUNE_REQU_DIR_NEG 20U
 #define LCPID_TUNE_REQU_DIR_POS 10U
 #define LCPID_TUNE_REQU_ZN_DIST 3000U
 #define LC_ERR_LC3PHy_XSETVALUE 31565U
 #define LC_ERR_LCPIDTune_MAXMIN 31564U
 #define LCDBLPID_TSTATE_FINISHED 3U
 #define LCSLIMPID_REQU_OSCILLATE 1U
 #define LC_ERR_LCPIDTune_TIMEOUT 12040U
 #define LC_ERR_LCPID_PAR_FBKMODE 31558U
 #define LC_WARN_LCPID_I_MAXLIMIT 12001U
 #define LC_WARN_LCPID_I_MINLIMIT 12002U
 #define LC_WARN_LCPID_YFBK_LIMIT 12003U
 #define LCPIDAUTOTUNE_STATE_READY 0U
 #define LCPID_TUNE_REQU_OSCILLATE 1U
 #define LCPID_TUNE_STATE_FINISHED 50U
 #define LCSLIMPID_REQU_CHR_REF_AP 4000U
 #define LCSLIMPID_REQU_CHR_REF_OS 5000U
 #define LCSLIMPID_REQU_READ_PARAS 3U
 #define LC_ERR_LCMovAvFilter_BASE 31551U
 #define LC_ERR_LCPIDTune_BASETIME 31566U
 #define LC_ERR_LCPID_PAR_CALCMODE 31555U
 #define LC_ERR_LCPWM_DMod_TPERIOD 12033U
 #define LCPIDAUTOTUNE_ADDINFO_Y_ON 104U
 #define LCPID_TUNE_REQU_CHR_REF_AP 4000U
 #define LCPID_TUNE_REQU_CHR_REF_OS 5000U
 #define LCPID_TUNE_STATE_CALC_PARA 45U
 #define LCPID_TUNE_STATE_OSCILLATE 10U
 #define LCSLIMPID_REQU_CHR_DIST_AP 1000U
 #define LCSLIMPID_REQU_CHR_DIST_OS 2000U
 #define LCSLIMPID_REQU_WRITE_PARAS 4U
 #define LC_ERR_LCPIDAutotune_ABORT 12038U
 #define LC_ERR_LCPIDTune_PARAMETER 12039U
 #define LC_ERR_LCPIDTune_W_CHANGED 12041U
 #define LC_ERR_LCPID_PAR_PRESCALER 12042U
 #define LC_ERR_LCPWM_DMod_TMINPULS 12032U
 #define LC_ERR_LCRampLim_TUP_TDOWN 12034U
 #define LCPIDAUTOTUNE_ADDINFO_Y_OFF 103U
 #define LCPIDAUTOTUNE_REQU_AUTOTUNE 3U
 #define LCPID_FBK_MODE_EXT_SELECTOR 3U
 #define LCPID_OUT_MODE_MAN_JOLTFREE 102U
 #define LCPID_TUNE_REQU_CHR_DIST_AP 1000U
 #define LCPID_TUNE_REQU_CHR_DIST_OS 2000U
 #define LCPID_TUNE_STATE_RESET_CNTL 49U
 #define LCSLIMPID_REQU_STEPRESPONSE 2U
 #define LC_WARN_LCPIDTune_CYCLETIME 12004U
 #define LCPIDAUTOTUNE_REQU_OSCILLATE 2U
 #define LCPIDAUTOTUNE_STATE_FINISHED 50U
 #define LCPIDAUTOTUNE_STATE_WAIT_MAX 30U
 #define LCPID_OUT_MODE_OPEN_JOLTFREE 103U
 #define LCPID_TUNE_ADDINFO_PRESCALER 112U
 #define LCPID_TUNE_REQU_STEPRESPONSE 2U
 #define LCPID_TUNE_STATE_OSC_CNTLPAR 19U
 #define LC_ERR_LCContinServo_TCHANGE 12035U
 #define LC_ERR_LCCurveByPoints_TABLE 12045U
 #define LC_ERR_LCPIDAutotune_TIMEOUT 12040U
 #define LC_ERR_LCPIDTune_CONTROL_VAR 31560U
 #define LC_ERR_LCTimBasOnOff_TCHANGE 12035U
 #define LC_WARN_LCDBLPID_TUNE_CHANGE 12019U
 #define LCPIDAUTOTUNE_STATE_OSCILLATE 40U
 #define LCPIDAUTOTUNE_STATE_WAIT_STEP 10U
 #define LCPID_OUT_MODE_CLOSE_JOLTFREE 104U
 #define LCPID_TUNE_ADDINFO_OSC_PERIOD 111U
 #define LCPID_TUNE_STATE_OSC_SEQ_CNTL 11U
 #define LCPID_TUNE_STATE_STEP_MAXGRAD 21U
 #define LCPID_TUNE_STATE_STEP_WAITEQ1 20U
 #define LCPID_TUNE_STATE_STEP_WAITEQ2 22U
 #define LC_ERR_LCContinServo_TIMPULSE 12036U
 #define LC_ERR_LCTimBasOnOff_TIMPULSE 12036U
 #define LCPIDAUTOTUNE_ADDINFO_OSC_AMPL 100U
 #define LCPID_OUT_MODE_FREEZE_JOLTFREE 105U
 #define LCPID_TUNE_STATE_OSC_PERFORM_1 12U
 #define LCPID_TUNE_STATE_OSC_PERFORM_2 13U
 #define LCPID_TUNE_STATE_OSC_WAIT_NEXT 14U
 #define LC_ERR_LCPIDAutotune_PARAMETER 12039U
 #define LC_ERR_LCPIDAutotune_W_CHANGED 12041U
 #define LCPIDAUTOTUNE_ADDINFO_PRESCALER 102U
 #define LCPIDAUTOTUNE_OPT_NEW_WEIGHTING 4U
 #define LCPIDAUTOTUNE_REQU_STEPRESPONSE 1U
 #define LCPIDAUTOTUNE_STATE_RESET_CTRLR 49U
 #define LCPIDAUTOTUNE_ADDINFO_OSC_PERIOD 101U
 #define LCPIDAUTOTUNE_STATE_STEPRESPONSE 20U
 #define LC_ERR_LCPIDTune_INVALID_REQUEST 31559U
#else
 #ifndef _GLOBAL_CONST
   #define _GLOBAL_CONST _WEAK const
 #endif
 _GLOBAL_CONST unsigned short LC_ERROR;
 _GLOBAL_CONST unsigned short LC_ERR_MAXMIN;
 _GLOBAL_CONST unsigned short LC_WARN_Tx_DT;
 _GLOBAL_CONST unsigned char LCPID_D_MODE_E;
 _GLOBAL_CONST unsigned char LCPID_D_MODE_X;
 _GLOBAL_CONST unsigned short LC_ERR_LCPT1_T;
 _GLOBAL_CONST unsigned short LC_ERR_POINTER;
 _GLOBAL_CONST unsigned short LC_ERR_DISABLED;
 _GLOBAL_CONST unsigned long LCSLIMPID_REQU_P;
 _GLOBAL_CONST unsigned long LCPID_TUNE_REQU_P;
 _GLOBAL_CONST unsigned long LCSLIMPID_REQU_PI;
 _GLOBAL_CONST unsigned char LCDBLPID_TSTATE_Y1;
 _GLOBAL_CONST unsigned char LCDBLPID_TSTATE_Y2;
 _GLOBAL_CONST unsigned char LCPID_OUT_MODE_MAN;
 _GLOBAL_CONST unsigned char LCPID_OUT_MODE_OFF;
 _GLOBAL_CONST unsigned long LCPID_TUNE_REQU_PI;
 _GLOBAL_CONST unsigned long LCSLIMPID_REQU_OFF;
 _GLOBAL_CONST unsigned long LCSLIMPID_REQU_PID;
 _GLOBAL_CONST unsigned short LC_ERR_LCPID_IDENT;
 _GLOBAL_CONST unsigned char LCDBLPID_TSTATE_OFF;
 _GLOBAL_CONST unsigned char LCPID_OUT_MODE_AUTO;
 _GLOBAL_CONST unsigned char LCPID_OUT_MODE_OPEN;
 _GLOBAL_CONST unsigned long LCPID_TUNE_REQU_OFF;
 _GLOBAL_CONST unsigned long LCPID_TUNE_REQU_PID;
 _GLOBAL_CONST unsigned short LC_ERR_LCPID_PAR_KP;
 _GLOBAL_CONST unsigned short LC_ERR_LCPID_PAR_KW;
 _GLOBAL_CONST unsigned short LC_ERR_LCPID_PAR_TF;
 _GLOBAL_CONST unsigned short LC_ERR_LCPID_PAR_TN;
 _GLOBAL_CONST unsigned short LC_ERR_LCPID_PAR_TV;
 _GLOBAL_CONST unsigned short LC_WARN_DT_MAXLIMIT;
 _GLOBAL_CONST unsigned char LCDBLPID_MODE_TUNE_4;
 _GLOBAL_CONST unsigned char LCDBLPID_MODE_TUNE_6;
 _GLOBAL_CONST unsigned char LCPID_CALC_MODE_FAST;
 _GLOBAL_CONST unsigned char LCPID_OUT_MODE_CLOSE;
 _GLOBAL_CONST unsigned long LCSLIMPID_REQU_OSC_1;
 _GLOBAL_CONST unsigned long LCSLIMPID_REQU_OSC_2;
 _GLOBAL_CONST unsigned long LCSLIMPID_REQU_OSC_3;
 _GLOBAL_CONST unsigned long LCSLIMPID_REQU_PER_3;
 _GLOBAL_CONST unsigned long LCSLIMPID_REQU_PER_4;
 _GLOBAL_CONST unsigned long LCSLIMPID_REQU_PER_5;
 _GLOBAL_CONST unsigned short LC_ERR_LCPID_OUTMODE;
 _GLOBAL_CONST unsigned short LC_ERR_LCPID_PARADAT;
 _GLOBAL_CONST unsigned short LC_ERR_LCPWM_TPERIOD;
 _GLOBAL_CONST unsigned char LCDBLPID_MODE_TUNE_Y1;
 _GLOBAL_CONST unsigned char LCDBLPID_MODE_TUNE_Y2;
 _GLOBAL_CONST unsigned char LCDBLPID_TSTATE_ERROR;
 _GLOBAL_CONST unsigned char LCPID_CALC_MODE_EXACT;
 _GLOBAL_CONST unsigned char LCPID_FBK_MODE_EXTERN;
 _GLOBAL_CONST unsigned char LCPID_FBK_MODE_INTERN;
 _GLOBAL_CONST unsigned char LCPID_OUT_MODE_FREEZE;
 _GLOBAL_CONST unsigned long LCPID_TUNE_REQU_OSC_1;
 _GLOBAL_CONST unsigned long LCPID_TUNE_REQU_OSC_2;
 _GLOBAL_CONST unsigned long LCPID_TUNE_REQU_OSC_3;
 _GLOBAL_CONST unsigned long LCPID_TUNE_REQU_PER_3;
 _GLOBAL_CONST unsigned long LCPID_TUNE_REQU_PER_4;
 _GLOBAL_CONST unsigned long LCPID_TUNE_REQU_PER_5;
 _GLOBAL_CONST unsigned short LC_ERR_LCDBLPID_DX_DT;
 _GLOBAL_CONST unsigned short LC_ERR_LCIntegrate_TN;
 _GLOBAL_CONST unsigned short LC_ERR_LCPID_PAR_KFBK;
 _GLOBAL_CONST unsigned short LC_ERR_LCPWM_TMINPULS;
 _GLOBAL_CONST unsigned short LC_WARN_LCxPHy_XSTART;
 _GLOBAL_CONST unsigned char LCPIDAUTOTUNE_REQU_OFF;
 _GLOBAL_CONST unsigned short LCPID_TUNE_STATE_READY;
 _GLOBAL_CONST unsigned long LCSLIMPID_REQU_DIR_NEG;
 _GLOBAL_CONST unsigned long LCSLIMPID_REQU_DIR_POS;
 _GLOBAL_CONST unsigned long LCSLIMPID_REQU_ZN_DIST;
 _GLOBAL_CONST unsigned short LC_ERR_LCDBLPID_WX_LOW;
 _GLOBAL_CONST unsigned short LC_ERR_LCPIDTune_ABORT;
 _GLOBAL_CONST unsigned short LC_ERR_LCPID_PAR_DMODE;
 _GLOBAL_CONST unsigned short LC_ERR_LCPID_PAR_DYMAX;
 _GLOBAL_CONST unsigned long LCPID_TUNE_REQU_DIR_NEG;
 _GLOBAL_CONST unsigned long LCPID_TUNE_REQU_DIR_POS;
 _GLOBAL_CONST unsigned long LCPID_TUNE_REQU_ZN_DIST;
 _GLOBAL_CONST unsigned short LC_ERR_LC3PHy_XSETVALUE;
 _GLOBAL_CONST unsigned short LC_ERR_LCPIDTune_MAXMIN;
 _GLOBAL_CONST unsigned char LCDBLPID_TSTATE_FINISHED;
 _GLOBAL_CONST unsigned long LCSLIMPID_REQU_OSCILLATE;
 _GLOBAL_CONST unsigned short LC_ERR_LCPIDTune_TIMEOUT;
 _GLOBAL_CONST unsigned short LC_ERR_LCPID_PAR_FBKMODE;
 _GLOBAL_CONST unsigned short LC_WARN_LCPID_I_MAXLIMIT;
 _GLOBAL_CONST unsigned short LC_WARN_LCPID_I_MINLIMIT;
 _GLOBAL_CONST unsigned short LC_WARN_LCPID_YFBK_LIMIT;
 _GLOBAL_CONST unsigned short LCPIDAUTOTUNE_STATE_READY;
 _GLOBAL_CONST unsigned long LCPID_TUNE_REQU_OSCILLATE;
 _GLOBAL_CONST unsigned short LCPID_TUNE_STATE_FINISHED;
 _GLOBAL_CONST unsigned long LCSLIMPID_REQU_CHR_REF_AP;
 _GLOBAL_CONST unsigned long LCSLIMPID_REQU_CHR_REF_OS;
 _GLOBAL_CONST unsigned long LCSLIMPID_REQU_READ_PARAS;
 _GLOBAL_CONST unsigned short LC_ERR_LCMovAvFilter_BASE;
 _GLOBAL_CONST unsigned short LC_ERR_LCPIDTune_BASETIME;
 _GLOBAL_CONST unsigned short LC_ERR_LCPID_PAR_CALCMODE;
 _GLOBAL_CONST unsigned short LC_ERR_LCPWM_DMod_TPERIOD;
 _GLOBAL_CONST unsigned short LCPIDAUTOTUNE_ADDINFO_Y_ON;
 _GLOBAL_CONST unsigned long LCPID_TUNE_REQU_CHR_REF_AP;
 _GLOBAL_CONST unsigned long LCPID_TUNE_REQU_CHR_REF_OS;
 _GLOBAL_CONST unsigned short LCPID_TUNE_STATE_CALC_PARA;
 _GLOBAL_CONST unsigned short LCPID_TUNE_STATE_OSCILLATE;
 _GLOBAL_CONST unsigned long LCSLIMPID_REQU_CHR_DIST_AP;
 _GLOBAL_CONST unsigned long LCSLIMPID_REQU_CHR_DIST_OS;
 _GLOBAL_CONST unsigned long LCSLIMPID_REQU_WRITE_PARAS;
 _GLOBAL_CONST unsigned short LC_ERR_LCPIDAutotune_ABORT;
 _GLOBAL_CONST unsigned short LC_ERR_LCPIDTune_PARAMETER;
 _GLOBAL_CONST unsigned short LC_ERR_LCPIDTune_W_CHANGED;
 _GLOBAL_CONST unsigned short LC_ERR_LCPID_PAR_PRESCALER;
 _GLOBAL_CONST unsigned short LC_ERR_LCPWM_DMod_TMINPULS;
 _GLOBAL_CONST unsigned short LC_ERR_LCRampLim_TUP_TDOWN;
 _GLOBAL_CONST unsigned short LCPIDAUTOTUNE_ADDINFO_Y_OFF;
 _GLOBAL_CONST unsigned char LCPIDAUTOTUNE_REQU_AUTOTUNE;
 _GLOBAL_CONST unsigned char LCPID_FBK_MODE_EXT_SELECTOR;
 _GLOBAL_CONST unsigned char LCPID_OUT_MODE_MAN_JOLTFREE;
 _GLOBAL_CONST unsigned long LCPID_TUNE_REQU_CHR_DIST_AP;
 _GLOBAL_CONST unsigned long LCPID_TUNE_REQU_CHR_DIST_OS;
 _GLOBAL_CONST unsigned short LCPID_TUNE_STATE_RESET_CNTL;
 _GLOBAL_CONST unsigned long LCSLIMPID_REQU_STEPRESPONSE;
 _GLOBAL_CONST unsigned short LC_WARN_LCPIDTune_CYCLETIME;
 _GLOBAL_CONST unsigned char LCPIDAUTOTUNE_REQU_OSCILLATE;
 _GLOBAL_CONST unsigned short LCPIDAUTOTUNE_STATE_FINISHED;
 _GLOBAL_CONST unsigned short LCPIDAUTOTUNE_STATE_WAIT_MAX;
 _GLOBAL_CONST unsigned char LCPID_OUT_MODE_OPEN_JOLTFREE;
 _GLOBAL_CONST unsigned short LCPID_TUNE_ADDINFO_PRESCALER;
 _GLOBAL_CONST unsigned long LCPID_TUNE_REQU_STEPRESPONSE;
 _GLOBAL_CONST unsigned short LCPID_TUNE_STATE_OSC_CNTLPAR;
 _GLOBAL_CONST unsigned short LC_ERR_LCContinServo_TCHANGE;
 _GLOBAL_CONST unsigned short LC_ERR_LCCurveByPoints_TABLE;
 _GLOBAL_CONST unsigned short LC_ERR_LCPIDAutotune_TIMEOUT;
 _GLOBAL_CONST unsigned short LC_ERR_LCPIDTune_CONTROL_VAR;
 _GLOBAL_CONST unsigned short LC_ERR_LCTimBasOnOff_TCHANGE;
 _GLOBAL_CONST unsigned short LC_WARN_LCDBLPID_TUNE_CHANGE;
 _GLOBAL_CONST unsigned short LCPIDAUTOTUNE_STATE_OSCILLATE;
 _GLOBAL_CONST unsigned short LCPIDAUTOTUNE_STATE_WAIT_STEP;
 _GLOBAL_CONST unsigned char LCPID_OUT_MODE_CLOSE_JOLTFREE;
 _GLOBAL_CONST unsigned short LCPID_TUNE_ADDINFO_OSC_PERIOD;
 _GLOBAL_CONST unsigned short LCPID_TUNE_STATE_OSC_SEQ_CNTL;
 _GLOBAL_CONST unsigned short LCPID_TUNE_STATE_STEP_MAXGRAD;
 _GLOBAL_CONST unsigned short LCPID_TUNE_STATE_STEP_WAITEQ1;
 _GLOBAL_CONST unsigned short LCPID_TUNE_STATE_STEP_WAITEQ2;
 _GLOBAL_CONST unsigned short LC_ERR_LCContinServo_TIMPULSE;
 _GLOBAL_CONST unsigned short LC_ERR_LCTimBasOnOff_TIMPULSE;
 _GLOBAL_CONST unsigned short LCPIDAUTOTUNE_ADDINFO_OSC_AMPL;
 _GLOBAL_CONST unsigned char LCPID_OUT_MODE_FREEZE_JOLTFREE;
 _GLOBAL_CONST unsigned short LCPID_TUNE_STATE_OSC_PERFORM_1;
 _GLOBAL_CONST unsigned short LCPID_TUNE_STATE_OSC_PERFORM_2;
 _GLOBAL_CONST unsigned short LCPID_TUNE_STATE_OSC_WAIT_NEXT;
 _GLOBAL_CONST unsigned short LC_ERR_LCPIDAutotune_PARAMETER;
 _GLOBAL_CONST unsigned short LC_ERR_LCPIDAutotune_W_CHANGED;
 _GLOBAL_CONST unsigned short LCPIDAUTOTUNE_ADDINFO_PRESCALER;
 _GLOBAL_CONST unsigned short LCPIDAUTOTUNE_OPT_NEW_WEIGHTING;
 _GLOBAL_CONST unsigned char LCPIDAUTOTUNE_REQU_STEPRESPONSE;
 _GLOBAL_CONST unsigned short LCPIDAUTOTUNE_STATE_RESET_CTRLR;
 _GLOBAL_CONST unsigned short LCPIDAUTOTUNE_ADDINFO_OSC_PERIOD;
 _GLOBAL_CONST unsigned short LCPIDAUTOTUNE_STATE_STEPRESPONSE;
 _GLOBAL_CONST unsigned short LC_ERR_LCPIDTune_INVALID_REQUEST;
#endif




/* Datatypes and datatypes of function blocks */
typedef struct lcslimpid_par_typ
{	signed short Y_max;
	signed short Y_min;
	float Kp;
	float Tn;
	float Tv;
	float Kfbk;
} lcslimpid_par_typ;

typedef struct lcpid_tune_addpar_typ
{	unsigned long t_max_tune;
	float dY_max;
	float Tf_Tv;
	float Kw;
	float Kfbk;
	unsigned char fbk_mode;
	unsigned char d_mode;
	unsigned char calc_mode;
} lcpid_tune_addpar_typ;

typedef struct lcpid_tune_osc_options_typ
{	signed short osc_minAmplitude;
	float Q_min;
} lcpid_tune_osc_options_typ;

typedef struct lcpid_osc_val_typ
{	signed short X;
	unsigned long t;
} lcpid_osc_val_typ;

typedef struct lcpid_osc_per_typ
{	struct lcpid_osc_val_typ max;
	struct lcpid_osc_val_typ min;
} lcpid_osc_per_typ;

typedef struct lcpid_tune_osc_typ
{	struct lcpid_tune_osc_options_typ options;
	unsigned short oscPhase;
	signed char dir;
	signed short Y_hi;
	signed short Y_lo;
	unsigned short i_maxPeriod;
	unsigned short i_period;
	signed long X_ampl;
	signed long X_avg;
	signed long X_min_avg;
	signed long X_max_avg;
	signed long Y_avg;
	signed long deltaY;
	unsigned long t_Ylohi[5];
	unsigned long t_Yhilo[5];
	float Q_act;
	signed short a_wx;
	float amplitudeRatio;
	float Ku;
	unsigned long tPeriod;
	struct lcpid_osc_per_typ period[5];
} lcpid_tune_osc_typ;

typedef struct lcpid_tune_step_options_typ
{	signed short eqDeltaX;
	signed short eqDeltaWX;
	unsigned long eqDeltat;
	signed short evalDeltaX;
	unsigned short evalNfilter;
	unsigned short exitNotMaxdXCount;
	unsigned short exitdXRatio;
} lcpid_tune_step_options_typ;

typedef struct lcpid_tune_step_typ
{	struct lcpid_tune_step_options_typ options;
	signed short Y0;
	signed short Y1;
	unsigned long t_jump;
	signed short W;
	signed short X0;
	signed short Xmax;
	signed short Xmin;
	signed long Xfiltered;
	plcbit deltaXok;
	plcbit deltaWXok;
	unsigned long eqTime;
	signed char dir;
	signed short deltaX;
	signed short X1;
	unsigned long t1;
	plcbit t1set;
	float dX_dt;
	float dX_dt_max;
	signed short XmaxGrad;
	signed short maxX1;
	signed short maxX2;
	unsigned long maxt1;
	unsigned long maxt2;
	unsigned long tmaxGrad;
	float gainFactor;
	unsigned long deadTime;
	unsigned long riseTime;
	unsigned short notMaxCount;
	unsigned short gradientRatio;
	unsigned long cycleTime;
} lcpid_tune_step_typ;

typedef struct lcdblpid_tune_typ
{	signed short P1_manualAdjust;
	signed short I1_manualAdjust;
	signed short D1_manualAdjust;
	signed short P2_manualAdjust;
	signed short I2_manualAdjust;
	signed short D2_manualAdjust;
	signed short X_min;
	signed short X_max;
	signed short X0;
	signed short de_min;
	signed short Y0;
	signed short Y1step;
	signed short Y2step;
	unsigned long tuneY1_opt;
	unsigned long tuneY2_opt;
	unsigned char tune_first;
	signed short hyst;
	signed short measDelta;
	struct lcpid_tune_osc_options_typ osc_opt;
	struct lcpid_tune_step_options_typ step_opt;
} lcdblpid_tune_typ;

typedef struct lcdblpid_par_typ
{	signed short Y_max;
	signed short Y_min;
	signed short K_fact;
	float Kp;
	float Tn;
	float Tv;
} lcdblpid_par_typ;

typedef struct lcCurveByPoints_TabEntry_type
{	signed short x;
	signed short y;
} lcCurveByPoints_TabEntry_type;

typedef struct lcpid_addPar_typ
{	signed short y_autotune_on;
	signed short y_autotune_off;
	unsigned long t_autotune_max;
	signed short diff_dx_max;
	unsigned long diff_dt_max;
	unsigned short osc_nrPeriods;
	signed short osc_minAmplitude;
	unsigned short optSwitches;
	float dY_max;
	float Tf_Tv;
	float Kw;
	float Kfbk;
	unsigned char fbk_mode;
	unsigned char d_mode;
	unsigned char calc_mode;
} lcpid_addPar_typ;

typedef struct lcpid_internal_typ
{	unsigned short size;
	plcbit valid;
	struct lcpid_addPar_typ autotune_addpar;
	signed short Y_max;
	signed short Y_min;
	signed long dY_max1;
	signed long Kp1;
	signed long Kp_Tn_1;
	signed long Tv_Tf_1;
	signed long Tf_reciproc_1;
	signed long Kw1;
	signed long Kfbk_Kp_1;
	unsigned char fbk_mode;
	unsigned char d_mode;
	unsigned char calc_mode;
	unsigned short prescalerPow2;
	unsigned char force_outmode;
	signed short Y_force;
	signed short W;
	signed short X;
	unsigned char pid_init;
	unsigned long dt;
	signed long Yp1;
	signed long Yp2;
	signed long dYi1;
	signed long dYi2;
	signed long Yi1;
	signed long Yi2;
	signed long dt_Tf_1;
	signed long a11;
	signed long a12;
	signed long a21;
	signed long a22;
	signed long Yd1;
	signed long Yd2;
	signed long Ytotal1;
	signed long Ytotal2;
	signed long Ylim1;
	signed long Ylim2;
	signed long Y1;
	signed long Y2;
	signed long e_fbk;
} lcpid_internal_typ;

typedef struct lcpid_osc_typ
{	unsigned short i_maxPeriod;
	unsigned short i_period;
	signed long X_amplitude;
	float amplitudeRatio;
	unsigned long tPeriod;
	struct lcpid_osc_per_typ period[5];
} lcpid_osc_typ;

typedef struct lcpid_procPar_typ
{	unsigned short size;
	plcbit valid;
	plcbit stepResp_valid;
	float stepResp_v;
	unsigned long stepResp_t_u;
	unsigned long stepResp_t_g;
	plcbit osc_valid;
	float osc_amplitudeRatio;
	unsigned long osc_tPeriod;
	plcbit force_params;
	float Kp;
	float Kp_tune;
	float Tn;
	float Tn_tune;
	float Tv;
	float Tv_tune;
} lcpid_procPar_typ;

typedef struct lcpid_old_typ
{	struct lcpid_procPar_typ processPar;
	signed short P_manualAdjust;
	signed short I_manualAdjust;
	signed short D_manualAdjust;
	signed short Y_min;
	signed short Y_max;
	float dY_max;
	float Tf_Tv;
	float Kw;
	float Kfbk;
	unsigned long request;
	unsigned long time;
	signed short W;
	unsigned char fbk_mode;
	unsigned char d_mode;
	plcbit enable;
} lcpid_old_typ;

typedef struct lcpid_stepResp_typ
{	signed short W_old;
	signed short dW;
	signed short x_prev;
	signed short x_inflectionPt;
	unsigned long t_inflectionPt;
	float v;
	float v_max;
	unsigned long t_u;
	signed short x_pre;
	signed short x_max;
} lcpid_stepResp_typ;

typedef struct lcpid_diff_typ
{	plcbit init;
	signed short x_old;
	signed short dx;
	unsigned long dt;
	float dx_dt;
} lcpid_diff_typ;

typedef struct LCMovAvFilter
{
	/* VAR_INPUT (analog) */
	signed short x;
	unsigned short base;
	/* VAR_OUTPUT (analog) */
	unsigned short status;
	signed short y;
	/* VAR (analog) */
	signed long sum_old;
	unsigned long x_old_ptr;
	signed short x_old[32];
	unsigned short xIdx;
	unsigned short base_old;
	unsigned long bootkey_old;
	/* VAR_INPUT (digital) */
	plcbit enable;
	/* VAR (digital) */
	plcbit enable_old;
} LCMovAvFilter_typ;

typedef struct LCPIDTune
{
	/* VAR_INPUT (analog) */
	signed short Y_min;
	signed short Y_max;
	signed short Y0;
	signed short Y1;
	signed short X0;
	signed short X_min;
	signed short X_max;
	signed short P_manualAdjust;
	signed short I_manualAdjust;
	signed short D_manualAdjust;
	unsigned long request;
	unsigned long basetime;
	struct lcpid_tune_addpar_typ* pAddPar;
	struct lcpid_tune_osc_options_typ* pOptions_osc;
	struct lcpid_tune_step_options_typ* pOptions_step;
	/* VAR_OUTPUT (analog) */
	unsigned short status;
	unsigned short addInfo;
	unsigned long ident;
	unsigned short state;
	/* VAR (analog) */
	unsigned long dt;
	unsigned long t_autotune;
	unsigned short status_tmp;
	signed short e;
	signed short e_minAmp;
	signed short e_old_up;
	signed short e_old_down;
	signed short e_old;
	struct LCMovAvFilter MovAvgFlt_inst;
	struct lcpid_old_typ old;
	struct lcpid_procPar_typ processPar;
	struct lcpid_internal_typ internal_data;
	struct lcpid_tune_addpar_typ addPar;
	struct lcpid_tune_osc_typ oscillation;
	struct lcpid_tune_step_typ stepresponse;
	/* VAR_INPUT (digital) */
	plcbit enable;
	plcbit okToStep;
	/* VAR_OUTPUT (digital) */
	plcbit rdyToStep;
	/* VAR (digital) */
	plcbit curveDown;
	plcbit curveUp;
} LCPIDTune_typ;

typedef struct LCPID
{
	/* VAR_INPUT (analog) */
	unsigned long ident;
	signed short W;
	signed short X;
	signed short A;
	signed short Y_man;
	signed short Y_fbk;
	unsigned char out_mode;
	unsigned long basetime;
	/* VAR_OUTPUT (analog) */
	unsigned short status;
	signed long e;
	signed short Y;
	signed long Yp;
	signed long Yi;
	signed long Yd;
	/* VAR (analog) */
	unsigned long time_old;
	signed long Tv_Tf_old;
	signed long e_old;
	/* VAR_INPUT (digital) */
	plcbit enable;
	plcbit hold_I;
	/* VAR (digital) */
	plcbit enable_old;
} LCPID_typ;

typedef struct LCSlimPID
{
	/* VAR_INPUT (analog) */
	signed short W;
	signed short X;
	unsigned long request;
	struct lcslimpid_par_typ* pPar;
	unsigned long basetime;
	/* VAR_OUTPUT (analog) */
	signed long e;
	signed short Y;
	unsigned short status;
	unsigned short addInfo;
	/* VAR (analog) */
	struct LCMovAvFilter MovAvgFlt_inst;
	struct LCPIDTune PIDTune_inst;
	struct LCPID PID_inst;
	unsigned long requ_old;
	/* VAR_INPUT (digital) */
	plcbit enable;
	/* VAR (digital) */
	plcbit enable_old;
} LCSlimPID_typ;

typedef struct LCPWM
{
	/* VAR_INPUT (analog) */
	signed short x;
	signed short max_value;
	signed short min_value;
	unsigned short t_min_pulse;
	unsigned short t_period;
	unsigned long basetime;
	/* VAR_OUTPUT (analog) */
	unsigned short status;
	/* VAR (analog) */
	signed long area;
	unsigned short period;
	unsigned long time_old;
	unsigned short last;
	signed short x_old;
	/* VAR_INPUT (digital) */
	plcbit enable;
	/* VAR_OUTPUT (digital) */
	plcbit pulse;
	/* VAR (digital) */
	plcbit enable_old;
} LCPWM_typ;

typedef struct LCContinServo
{
	/* VAR_INPUT (analog) */
	signed short x;
	signed short max_value;
	signed short min_value;
	unsigned short t_impulse;
	unsigned short t_change_up;
	unsigned short t_change_down;
	unsigned long basetime;
	/* VAR_OUTPUT (analog) */
	unsigned short status;
	unsigned short hysteresis_up;
	unsigned short hysteresis_down;
	/* VAR (analog) */
	unsigned long time_old;
	signed long t_cnt;
	signed long y_fix31_1;
	signed long y_fix31_2;
	/* VAR_INPUT (digital) */
	plcbit enable;
	plcbit ref;
	/* VAR_OUTPUT (digital) */
	plcbit up;
	plcbit down;
	plcbit refOk;
	/* VAR (digital) */
	plcbit enable_old;
	plcbit ref_old;
} LCContinServo_typ;

typedef struct LCMinMax
{
	/* VAR_INPUT (analog) */
	signed short in;
	/* VAR_OUTPUT (analog) */
	signed short out_min;
	signed short out_max;
	/* VAR_INPUT (digital) */
	plcbit reset;
} LCMinMax_typ;

typedef struct LCDblActPID
{
	/* VAR_INPUT (analog) */
	signed short W;
	signed short X;
	signed short Y_man;
	unsigned char mode;
	unsigned long basetime;
	struct lcdblpid_par_typ* pPar1;
	struct lcdblpid_par_typ* pPar2;
	struct lcpid_tune_addpar_typ* pAddPar;
	struct lcdblpid_tune_typ* pOpt;
	/* VAR_OUTPUT (analog) */
	signed long e;
	signed short Y1;
	signed short Y2;
	unsigned short status;
	unsigned char tuneState;
	/* VAR (analog) */
	struct LCPID pid;
	struct LCPIDTune tune;
	float gradient;
	signed long Y_avg;
	unsigned long tcnt;
	signed short Tmeas;
	signed short y_lim_old;
	unsigned char use_par;
	unsigned char meas;
	unsigned char mode_old;
	unsigned char tune_step;
	unsigned char tune_grad;
	unsigned char tune_2nd;
	unsigned char invert;
	unsigned char mode_int;
	/* VAR_INPUT (digital) */
	plcbit enable;
	plcbit hold_I;
	plcbit okToStep;
	/* VAR_OUTPUT (digital) */
	plcbit rdyToStep;
	/* VAR (digital) */
	plcbit enable_old;
} LCDblActPID_typ;

typedef struct LCPFM
{
	/* VAR_INPUT (analog) */
	signed short x;
	signed short max_value;
	signed short min_value;
	unsigned short t_pulse;
	unsigned short t_pause;
	unsigned long basetime;
	/* VAR_OUTPUT (analog) */
	unsigned short status;
	/* VAR (analog) */
	signed short range;
	signed long area;
	signed long area_c;
	unsigned long time_old;
	signed long last;
	signed long tpls;
	/* VAR_INPUT (digital) */
	plcbit enable;
	/* VAR_OUTPUT (digital) */
	plcbit pulse;
	/* VAR (digital) */
	plcbit enable_old;
} LCPFM_typ;

typedef struct LCScINT
{
	/* VAR_INPUT (analog) */
	signed short x;
	signed short x1;
	signed short y1;
	signed short x2;
	signed short y2;
	/* VAR_OUTPUT (analog) */
	signed short y;
} LCScINT_typ;

typedef struct LCCurveByPoints
{
	/* VAR_INPUT (analog) */
	signed short x;
	unsigned short NoOfPoints;
	struct lcCurveByPoints_TabEntry_type* ptr_table;
	/* VAR_OUTPUT (analog) */
	unsigned short status;
	signed short y;
	/* VAR (analog) */
	signed short i_tab;
	unsigned short iterations;
	struct LCScINT scal1;
} LCCurveByPoints_typ;

typedef struct LCPWM_DMod
{
	/* VAR_INPUT (analog) */
	signed short x;
	signed short max_value;
	signed short min_value;
	unsigned short tminpuls;
	unsigned short tperiod;
	unsigned long basetime;
	/* VAR_OUTPUT (analog) */
	unsigned short status;
	/* VAR (analog) */
	signed long area;
	unsigned short period;
	unsigned long time_old;
	unsigned short last;
	signed short x_old;
	/* VAR_INPUT (digital) */
	plcbit enable;
	/* VAR_OUTPUT (digital) */
	plcbit y;
	/* VAR (digital) */
	plcbit enable_old;
} LCPWM_DMod_typ;

typedef struct LCPIDpara
{
	/* VAR_INPUT (analog) */
	signed short Y_max;
	signed short Y_min;
	float dY_max;
	float Kp;
	float Tn;
	float Tv;
	float Tf;
	float Kw;
	float Kfbk;
	unsigned char fbk_mode;
	unsigned char d_mode;
	unsigned char calc_mode;
	/* VAR_OUTPUT (analog) */
	unsigned short status;
	unsigned long ident;
	/* VAR (analog) */
	struct lcpid_internal_typ internal_data;
	/* VAR_INPUT (digital) */
	plcbit enable;
	plcbit enter;
} LCPIDpara_typ;

typedef struct LCRampLim
{
	/* VAR_INPUT (analog) */
	signed short x;
	unsigned short tup;
	unsigned short tdown;
	signed short max_value;
	signed short min_value;
	signed short yset;
	unsigned long basetime;
	/* VAR_OUTPUT (analog) */
	unsigned short status;
	signed short y;
	/* VAR (analog) */
	unsigned long time_old;
	unsigned short rest;
	/* VAR_INPUT (digital) */
	plcbit enable;
	plcbit set;
	/* VAR_OUTPUT (digital) */
	plcbit xreached;
	plcbit max_limit;
	plcbit min_limit;
	/* VAR (digital) */
	plcbit enable_old;
} LCRampLim_typ;

typedef struct LCTimeBasedOnOff
{
	/* VAR_INPUT (analog) */
	signed short x;
	signed short max_value;
	signed short min_value;
	unsigned short timpulse;
	unsigned short tchange_up;
	unsigned short tchange_dwn;
	unsigned long basetime;
	/* VAR_OUTPUT (analog) */
	unsigned short status;
	unsigned short hysteresis_up;
	unsigned short hysteresis_dwn;
	/* VAR (analog) */
	unsigned long time_old;
	signed long t_cnt;
	signed long y_fix31_1;
	signed long y_fix31_2;
	/* VAR_INPUT (digital) */
	plcbit enable;
	plcbit ref;
	/* VAR_OUTPUT (digital) */
	plcbit up;
	plcbit down;
	plcbit refOK;
	/* VAR (digital) */
	plcbit enable_old;
	plcbit ref_old;
} LCTimeBasedOnOff_typ;

typedef struct LCDifferentiate
{
	/* VAR_INPUT (analog) */
	signed short x;
	unsigned short tv;
	unsigned short tf;
	unsigned long basetime;
	/* VAR_OUTPUT (analog) */
	unsigned short status;
	signed short y;
	/* VAR (analog) */
	unsigned long time_old;
	signed long a2n;
	signed long a1;
	/* VAR_INPUT (digital) */
	plcbit enable;
	/* VAR (digital) */
	plcbit enable_old;
} LCDifferentiate_typ;

typedef struct LCPIDAutoTune
{
	/* VAR_INPUT (analog) */
	signed short Y_max;
	signed short Y_min;
	signed short P_manualAdjust;
	signed short I_manualAdjust;
	signed short D_manualAdjust;
	unsigned char request;
	unsigned long basetime;
	/* VAR_OUTPUT (analog) */
	unsigned short status;
	unsigned long ident;
	unsigned short addInfo;
	unsigned short state;
	/* VAR (analog) */
	unsigned long dt;
	unsigned long t_autotune;
	struct lcpid_diff_typ diff;
	struct lcpid_old_typ old;
	struct lcpid_stepResp_typ stepResponse;
	struct lcpid_osc_typ oscillation;
	struct lcpid_procPar_typ processPar;
	struct lcpid_internal_typ internal_data;
	/* VAR_INPUT (digital) */
	plcbit enable;
} LCPIDAutoTune_typ;

typedef struct LC2PHy
{
	/* VAR_INPUT (analog) */
	signed short x;
	signed short xstart;
	signed short xsetvalue;
	unsigned short hysteresis;
	signed short ymax;
	signed short ymin;
	/* VAR_OUTPUT (analog) */
	unsigned short status;
	signed short y;
	/* VAR (analog) */
	signed short x_old;
	/* VAR_INPUT (digital) */
	plcbit enable;
	/* VAR_OUTPUT (digital) */
	plcbit y1;
	/* VAR (digital) */
	plcbit enable_old;
} LC2PHy_typ;

typedef struct LCScUINT
{
	/* VAR_INPUT (analog) */
	unsigned short x;
	unsigned short x1;
	unsigned short y1;
	unsigned short x2;
	unsigned short y2;
	/* VAR_OUTPUT (analog) */
	unsigned short y;
} LCScUINT_typ;

typedef struct LC3PHy
{
	/* VAR_INPUT (analog) */
	signed short x;
	signed short xstart;
	signed short xsetvalue1;
	signed short xsetvalue2;
	unsigned short hysteresis1;
	unsigned short hysteresis2;
	signed short ymax;
	signed short ymid;
	signed short ymin;
	/* VAR_OUTPUT (analog) */
	unsigned short status;
	signed short y;
	/* VAR (analog) */
	signed short x_old;
	/* VAR_INPUT (digital) */
	plcbit enable;
	/* VAR_OUTPUT (digital) */
	plcbit ymx;
	plcbit ymn;
	/* VAR (digital) */
	plcbit enable_old;
} LC3PHy_typ;

typedef struct LCComparator
{
	/* VAR_INPUT (analog) */
	signed short xp;
	signed short xn;
	unsigned short sd;
	/* VAR_INPUT (digital) */
	plcbit enable;
	/* VAR_OUTPUT (digital) */
	plcbit greater;
	plcbit equal;
	plcbit lower;
} LCComparator_typ;

typedef struct LCCounter
{
	/* VAR_OUTPUT (analog) */
	unsigned long muscnt;
	unsigned long mus100cnt;
	unsigned long mscnt;
	unsigned long ms100cnt;
	unsigned long seccnt;
	/* VAR (analog) */
	unsigned short state;
	struct SysInfo sysinf_inst;
	unsigned short musecs_old;
	unsigned long bootkey_old;
	unsigned long sys_ticks_old;
	unsigned long to_100us;
	unsigned long to_1ms;
	unsigned short to_100ms;
	unsigned short to_1s;
} LCCounter_typ;

typedef struct LCIntegrate
{
	/* VAR_INPUT (analog) */
	signed short x;
	unsigned short tn;
	signed short max_value;
	signed short min_value;
	signed short yset;
	unsigned long basetime;
	/* VAR_OUTPUT (analog) */
	unsigned short status;
	signed short y;
	/* VAR (analog) */
	unsigned long time_old;
	signed long rest;
	/* VAR_INPUT (digital) */
	plcbit enable;
	plcbit set;
	/* VAR_OUTPUT (digital) */
	plcbit max_limit;
	plcbit min_limit;
	/* VAR (digital) */
	plcbit enable_old;
} LCIntegrate_typ;

typedef struct LCLimit
{
	/* VAR_INPUT (analog) */
	signed long in;
	signed short max_value;
	signed short min_value;
	/* VAR_OUTPUT (analog) */
	unsigned short status;
	signed short out;
	/* VAR_INPUT (digital) */
	plcbit enable;
	/* VAR_OUTPUT (digital) */
	plcbit max_limit;
	plcbit min_limit;
} LCLimit_typ;

typedef struct LCLiScDINT
{
	/* VAR_INPUT (analog) */
	signed long x;
	signed long x1;
	signed long y1;
	signed long x2;
	signed long y2;
	/* VAR_OUTPUT (analog) */
	signed long y;
} LCLiScDINT_typ;

typedef struct LCLiScINT
{
	/* VAR_INPUT (analog) */
	signed short x;
	signed short x1;
	signed short y1;
	signed short x2;
	signed short y2;
	/* VAR_OUTPUT (analog) */
	signed short y;
} LCLiScINT_typ;

typedef struct LCLiScUINT
{
	/* VAR_INPUT (analog) */
	unsigned short x;
	unsigned short x1;
	unsigned short y1;
	unsigned short x2;
	unsigned short y2;
	/* VAR_OUTPUT (analog) */
	unsigned short y;
} LCLiScUINT_typ;

typedef struct LCNegDINT
{
	/* VAR_INPUT (analog) */
	signed long in;
	/* VAR_OUTPUT (analog) */
	signed long out;
} LCNegDINT_typ;

typedef struct LCNegINT
{
	/* VAR_INPUT (analog) */
	signed short in;
	/* VAR_OUTPUT (analog) */
	signed short out;
} LCNegINT_typ;

typedef struct LCNegPeakVal
{
	/* VAR_INPUT (analog) */
	signed short in;
	/* VAR_OUTPUT (analog) */
	signed short out;
	/* VAR_INPUT (digital) */
	plcbit reset;
} LCNegPeakVal_typ;

typedef struct LCPosPeakVal
{
	/* VAR_INPUT (analog) */
	signed short in;
	/* VAR_OUTPUT (analog) */
	signed short out;
	/* VAR_INPUT (digital) */
	plcbit reset;
} LCPosPeakVal_typ;

typedef struct LCPT1
{
	/* VAR_INPUT (analog) */
	signed short x;
	unsigned short t;
	signed short yset;
	unsigned long basetime;
	/* VAR_OUTPUT (analog) */
	unsigned short status;
	signed short y;
	/* VAR (analog) */
	unsigned long time_old;
	signed long rest;
	/* VAR_INPUT (digital) */
	plcbit enable;
	plcbit set;
	/* VAR (digital) */
	plcbit enable_old;
} LCPT1_typ;

typedef struct LCScDINT
{
	/* VAR_INPUT (analog) */
	signed long x;
	signed long x1;
	signed long y1;
	signed long x2;
	signed long y2;
	/* VAR_OUTPUT (analog) */
	signed long y;
} LCScDINT_typ;



/* Prototyping of functions and function blocks */
_BUR_PUBLIC void LCSlimPID(struct LCSlimPID* inst);
_BUR_PUBLIC void LCPWM(struct LCPWM* inst);
_BUR_PUBLIC void LCContinServo(struct LCContinServo* inst);
_BUR_PUBLIC void LCMinMax(struct LCMinMax* inst);
_BUR_PUBLIC void LCPIDTune(struct LCPIDTune* inst);
_BUR_PUBLIC void LCDblActPID(struct LCDblActPID* inst);
_BUR_PUBLIC void LCPFM(struct LCPFM* inst);
_BUR_PUBLIC void LCCurveByPoints(struct LCCurveByPoints* inst);
_BUR_PUBLIC void LCPWM_DMod(struct LCPWM_DMod* inst);
_BUR_PUBLIC void LCPIDpara(struct LCPIDpara* inst);
_BUR_PUBLIC void LCRampLim(struct LCRampLim* inst);
_BUR_PUBLIC void LCPID(struct LCPID* inst);
_BUR_PUBLIC void LCTimeBasedOnOff(struct LCTimeBasedOnOff* inst);
_BUR_PUBLIC void LCDifferentiate(struct LCDifferentiate* inst);
_BUR_PUBLIC void LCPIDAutoTune(struct LCPIDAutoTune* inst);
_BUR_PUBLIC void LC2PHy(struct LC2PHy* inst);
_BUR_PUBLIC void LCScUINT(struct LCScUINT* inst);
_BUR_PUBLIC void LC3PHy(struct LC3PHy* inst);
_BUR_PUBLIC void LCComparator(struct LCComparator* inst);
_BUR_PUBLIC void LCCounter(struct LCCounter* inst);
_BUR_PUBLIC void LCIntegrate(struct LCIntegrate* inst);
_BUR_PUBLIC void LCLimit(struct LCLimit* inst);
_BUR_PUBLIC void LCLiScDINT(struct LCLiScDINT* inst);
_BUR_PUBLIC void LCLiScINT(struct LCLiScINT* inst);
_BUR_PUBLIC void LCLiScUINT(struct LCLiScUINT* inst);
_BUR_PUBLIC void LCMovAvFilter(struct LCMovAvFilter* inst);
_BUR_PUBLIC void LCNegDINT(struct LCNegDINT* inst);
_BUR_PUBLIC void LCNegINT(struct LCNegINT* inst);
_BUR_PUBLIC void LCNegPeakVal(struct LCNegPeakVal* inst);
_BUR_PUBLIC void LCPosPeakVal(struct LCPosPeakVal* inst);
_BUR_PUBLIC void LCPT1(struct LCPT1* inst);
_BUR_PUBLIC void LCScDINT(struct LCScDINT* inst);
_BUR_PUBLIC void LCScINT(struct LCScINT* inst);


#ifdef __cplusplus
};
#endif
#endif /* _LOOPCONT_ */

