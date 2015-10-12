from subprocess import call
import os

import xmltodict

JIRAFIELDFILEPATH = '/opt/acme/cm/resources/DocFieldList.xml'
DEFECTFILEPATH ='/tmp/CmrmKeyRecs.xml'


class JiraFields(object):
	def __init__(self, jiraId):
		'''Create the customfield to jira field dict'''
		customFields = dict()
		with open(JIRAFIELDFILEPATH,'r') as f:
			rawCustomFields = f.read()
			parse = xmltodict.parse(rawCustomFields)
			fields = parse['RECORD']['field']
			for field in fields:
				field['fieldname'] = ''.join(e for e in field['fieldname'] if e.isalnum())
				customFields[field['dbfield']] = field['fieldname']

		'''Run system perl script to get details for jiraid'''
		print jiraId
		os.system("/opt/acme/cm/bin/getRecordByKey.pl grbk "+ str(jiraId))

		'''Convert returned xml to readable dict'''
		with open(DEFECTFILEPATH,'r') as f:
			rawDefect = f.read()
			parse = xmltodict.parse(rawDefect)
			defectFields = parse['RECORD']

		self.defectCleaned = dict()
		for key,value in defectFields.iteritems():
			 try:
			 	self.defectCleaned[customFields[key]] = value
			 except:
			 	if not key.startswith('customfield'):
				 	self.defectCleaned[key] = value
