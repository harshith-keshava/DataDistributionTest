/* Automation Studio generated header file */
/* Do not edit ! */
/* ToolBox  */

#ifndef _TOOLBOX_
#define _TOOLBOX_
#ifdef __cplusplus
extern "C" 
{
#endif

#include <bur/plctypes.h>

#ifndef _BUR_PUBLIC
#define _BUR_PUBLIC
#endif



/* Prototyping of functions and function blocks */
_BUR_PUBLIC plcbit allZero(unsigned long pData, unsigned short szData);
_BUR_PUBLIC plcbit EdgePosArray(plcbit* Level, plcbit* PreviousLevel, plcbit* Edge, unsigned short Size);
_BUR_PUBLIC plcbit EdgeNegArray(plcbit* Level, plcbit* PreviousLevel, plcbit* Edge, unsigned short Size);
_BUR_PUBLIC plcbit EdgeArray(plcbit* Level, plcbit* PreviousLevel, plcbit* Edge, unsigned short Size);


#ifdef __cplusplus
};
#endif
#endif /* _TOOLBOX_ */

